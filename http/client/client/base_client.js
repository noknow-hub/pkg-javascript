//////////////////////////////////////////////////////////////////////
// base_client.js
//////////////////////////////////////////////////////////////////////
import { Header } from '../header.js';

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class BaseClient {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(url) {
        this.url = url;
        this.header = new Header();
        this.body;
        this.method;
        this.timeout;
        this.isLoading = false;
        this.isLoadingManually = false;
    }


    //////////////////////////////////////////////////////////////////////
    // Append header.
    //////////////////////////////////////////////////////////////////////
    AppendHeader(name, value) {
        this.header.fields.push({
            name: name,
            value: value
        });
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Append URL parameter.
    //////////////////////////////////////////////////////////////////////
    AppendUrlParameter(key, value) {
        if(this.url.includes('?')) {
            this.url = `${this.url}&${key}=${value}`;
        } else {
            this.url = `${this.url}?${key}=${value}`;
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Is Loading.
    //////////////////////////////////////////////////////////////////////
    IsLoading() {
        return this.isLoading || this.isLoadingManually;
    }


    //////////////////////////////////////////////////////////////////////
    // Set body.
    //////////////////////////////////////////////////////////////////////
    SetBody(body) {
        this.body = body;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set loading flag manually.
    //////////////////////////////////////////////////////////////////////
    SetLoading(flag) {
        this.isLoadingManually = flag;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set timeout with milliseconds.
    //////////////////////////////////////////////////////////////////////
    SetTimeout(milliSeconds) {
        this.timeout = milliSeconds;
    }

}
export { BaseClient };
