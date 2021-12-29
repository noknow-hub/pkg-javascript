//////////////////////////////////////////////////////////////////////
// fetch_client.js
//////////////////////////////////////////////////////////////////////
import { Client } from '../index.js';
import { BaseClient } from './base_client.js';

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class FetchClient extends BaseClient {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(url) {
        super(url);
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for cache.
    //////////////////////////////////////////////////////////////////////
    SetInitCache(cache) {
        this.cache = cache;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for credentials.
    //////////////////////////////////////////////////////////////////////
    SetInitCredentials(credentials) {
        this.credentials = credentials;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for mode.
    //////////////////////////////////////////////////////////////////////
    SetInitMode(mode) {
        this.mode = mode;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for redirect.
    //////////////////////////////////////////////////////////////////////
    SetInitRedirect(redirect) {
        this.redirect = redirect;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for referrer.
    //////////////////////////////////////////////////////////////////////
    SetInitReferrer(referrer) {
        this.referrer = referrer;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for referrerPolicy.
    //////////////////////////////////////////////////////////////////////
    SetInitReferrerPolicy(referrerPolicy) {
        this.referrerPolicy = referrerPolicy;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for integrity.
    //////////////////////////////////////////////////////////////////////
    SetInitIntegrity(integrity) {
        this.integrity = integrity;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for keepalive.
    //////////////////////////////////////////////////////////////////////
    SetInitKeepalive(keepalive) {
        this.keepalive = keepalive;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set init for signal.
    //////////////////////////////////////////////////////////////////////
    SetInitSignal(signal) {
        this.signal = signal;
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // HTTP GET request.
    //////////////////////////////////////////////////////////////////////
    Get() {
       this.method = Client.HTTP_METHOD_GET;
       return this.run();
    }


    //////////////////////////////////////////////////////////////////////
    // HTTP POST request.
    //////////////////////////////////////////////////////////////////////
    Post() {
       this.method = Client.HTTP_METHOD_POST;
       return this.run();
    }


    //////////////////////////////////////////////////////////////////////
    // HTTP PUT request.
    //////////////////////////////////////////////////////////////////////
    Put() {
       this.method = Client.HTTP_METHOD_PUT;
       return this.run();
    }


    //////////////////////////////////////////////////////////////////////
    // HTTP DELETE request.
    //////////////////////////////////////////////////////////////////////
    Delete() {
       this.method = Client.HTTP_METHOD_DELETE;
       return this.run();
    }


    //////////////////////////////////////////////////////////////////////
    // HTTP PATCH request.
    //////////////////////////////////////////////////////////////////////
    Patch() {
       this.method = Client.HTTP_METHOD_PATCH;
       return this.run();
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    async run() {
        this.isLoading = true;
        const init = {
            method: this.method,
        };
        if(this.header.CountFields() > 0) {
            const headers = new Headers();
            for(let i = 0; i < this.header.CountFields(); i++) {
                const field = this.header.GetField(i);
                headers.append(field.name, field.value);
            }
            init.headers = headers;
        }
        if(this.body !== undefined && this.body !== null) {
            init.body = this.body;
        }
        if(this.mode !== undefined && this.mode !== null) {
            init.mode = this.mode;
        }
        if(this.credentials !== undefined && this.credentials !== null) {
            init.credentials = this.credentials;
        }
        if(this.cache !== undefined && this.cache !== null) {
            init.cache = this.cache;
        }
        if(this.redirect !== undefined && this.redirect !== null) {
            init.redirect = this.redirect;
        }
        if(this.referrer !== undefined && this.referrer !== null) {
            init.referrer = this.referrer;
        }
        if(this.referrerPolicy !== undefined && this.referrerPolicy !== null) {
            init.referrerPolicy = this.referrerPolicy;
        }
        if(this.integrity !== undefined && this.integrity !== null) {
            init.integrity = this.integrity;
        }
        if(this.keepalive !== undefined && this.keepalive !== null) {
            init.keepalive = this.keepalive;
        }
        if(this.signal !== undefined && this.signal !== null) {
            init.signal = this.signal;
        }

        const resp = await fetch(this.url, init);
        this.isLoading = false;
        return resp;
    }

}
export { FetchClient };
