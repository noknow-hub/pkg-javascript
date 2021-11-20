//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class LocalizationJson {

    //////////////////////////////////////////////////////////////////////
    // Constructor.
    //////////////////////////////////////////////////////////////////////
    constructor(langCodeUrlMapList) {
        this.langCodeUrlMapList = langCodeUrlMapList;
        this.lsKeyPrefix = 'Localization.';
        this.lsKeyDate = this.lsKeyPrefix + 'date';
        this.lsExpiresDate = 3;
        this.isLoading = false;
        this.sleep = 3000;
        this.sleepCnt = 5;
        this.Strings = {};

        // Start loading.
        this.load();
    }


    //////////////////////////////////////////////////////////////////////
    // Get localized string.
    //////////////////////////////////////////////////////////////////////
    async String(langCode, key, defaultVal = key) {
        // Check if it has been loading JSON file or not.
        await this.queuing();

        if(this.Strings[langCode] == null) {
            return defaultVal;
        }

        const keys = key.split('.');
        let value;
        for(let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if(i === 0) {
                if(this.Strings[langCode][k] == null || this.Strings[langCode][k] === '') {
                    return defaultVal;
                } else {
                    value = this.Strings[langCode][k];
                }
            } else {
                if(value[k] == null || value[k] === '') {
                    return defaultVal;
                } else {
                    value = value[k];
                }
            }
        }
        return value;
    }


    //////////////////////////////////////////////////////////////////////
    // HTTP GET request.
    //////////////////////////////////////////////////////////////////////
    getRequest(langCode, url) {
        this.isLoading = true;
        new Promise((resolve, reject) => {
            const expires = new Date();
            expires.setDate(expires.getDate() + this.lsExpiresDate);
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => {
                if(xhr.status >= 200 && xhr.status < 300) {
                    const resJson = JSON.parse(xhr.responseText);
                    if(resJson !== undefined && resJson !== null) {
                        this.Strings[langCode] = resJson;
                        window.localStorage.setItem(this.lsKeyPrefix + langCode, JSON.stringify(resJson));
                        window.localStorage.setItem(this.lsKeyDate, expires.toString());
                        resolve();
                    } else {
                        reject('Invalid a json file. url: ' + url);
                    }
                } else {
                    reject(xhr.status + ' ' + xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.status + ' ' + xhr.statusText);
            xhr.send();
        });
    }


    //////////////////////////////////////////////////////////////////////
    // Load.
    //////////////////////////////////////////////////////////////////////
    async load(langCodeUrlMapList) {
        // Check the localization in the local storage.
        const needLangCodeUrlMapList = [];
        const now = new Date();
        const lsDate = new Date(window.localStorage.getItem(this.lsKeyDate)).getTime();
        for(let i = 0; i < this.langCodeUrlMapList.length; i++) {
            const langCodeUrlMap = this.langCodeUrlMapList[i];
            const langCode = langCodeUrlMap['langCode'];
            const url = langCodeUrlMap['url'];
            if(lsDate > 0 && now.getTime() < lsDate) {
                const obj = JSON.parse(window.localStorage.getItem(this.lsKeyPrefix + langCode));
                if(obj !== undefined && obj !== null) {
                    this.Strings[langCode] = obj;
                } else {
                    needLangCodeUrlMapList.push({
                        langCode: langCode,
                        url: url
                    });
                }
            } else {
                needLangCodeUrlMapList.push(langCodeUrlMap);
            }
        }

        // HTTP GET request.
        try {
            for(let i = 0; i < needLangCodeUrlMapList.length; i++) {
                const needLangCodeUrlMap = needLangCodeUrlMapList[i];
                await this.getRequest(needLangCodeUrlMap['langCode'], needLangCodeUrlMap['url']);
            }
        } catch(err) {
            throw new Error(err);
        } finally {
            this.isLoading = false;
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Queuing.
    //////////////////////////////////////////////////////////////////////
    async queuing() {
        if(this.isLoading) {
            for(let i = 0; i < this.sleepCnt; i++) {
                await this.timer();
                if(!this.isLoading) {
                    break;
                }
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Timer.
    //////////////////////////////////////////////////////////////////////
    timer() {
        return new Promise(resolve => setTimeout(resolve, this.sleep));
    }

}
export { LocalizationJson };
