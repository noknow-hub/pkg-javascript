//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class Cookie {

    static DEFAULT_EXPIRES_SEC = 60 * 60 * 24;
    static DEFAULT_PATH = '/';
    static SAMESITE_NONE = 'None';
    static SAMESITE_LAX = 'Lax';
    static SAMESITE_STRICT = 'Strict';

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        
    }


    //////////////////////////////////////////////////////////////////////
    // Delete cookie.
    //////////////////////////////////////////////////////////////////////
    static Delete(name, path = null) {
        if(path != null) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path + ';';
        } else {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Is https or not.
    //////////////////////////////////////////////////////////////////////
    static IsHttps() {
        return window.location.protocol === 'https:';
    }


    //////////////////////////////////////////////////////////////////////
    // Set cookie.
    //////////////////////////////////////////////////////////////////////
    static SetCookie(name, value, expiresSec, path, secureFlag, sameSite = 'Strict') {
        const d = new Date();
        d.setTime(d.getTime() + expiresSec * 1000);
        let cookie = name + '=' + value +
            ';expires=' + d.toUTCString() +
            (path !== '' ? ';path=' + path : '') +
            (secureFlag === true ? ';secure' : '') +
            (sameSite !== '' ? ';samesite=' + sameSite : '') + ';';
        document.cookie = cookie;
    }


    //////////////////////////////////////////////////////////////////////
    // Get cookie.
    //////////////////////////////////////////////////////////////////////
    static GetCookie(name) {
        const n = name + '=';
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while(c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(n) == 0) {
                return c.substring(n.length, c.length);
            }
        }
        return '';
    }

    //////////////////////////////////////////////////////////////////////
    // Get the URL query value from the key.
    //////////////////////////////////////////////////////////////////////
    static GetUrlQueryValByKey(key) {
        let result;
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(href, k, v) {
            if(key === k) {
                result = v;
                return;
            }
        });
        return result;
    }

}
export { Cookie };
