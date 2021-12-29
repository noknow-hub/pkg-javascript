//////////////////////////////////////////////////////////////////////
// xhr_client.js
//////////////////////////////////////////////////////////////////////
import { Client } from '../index.js';
import { BaseClient } from './base_client.js';

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class XhrClient extends BaseClient {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(url) {
        super(url);
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
    run() {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if(this.timeout !== undefined || this.timeout !== null) {
                xhr.timeout = this.timeout;
            }   
            xhr.open(this.method, this.url);
            for(let i = 0; i < this.header.CountFields(); i++) {
                const field = this.header.GetField(i);
                xhr.setRequestHeader(field.name, field.value);
            }   
            xhr.onload = () => {
                this.isLoading = false;
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }   
            }   
            xhr.onerror = () => {
                this.isLoading = false;
                reject(xhr);
            }
            xhr.ontimeout = () => {
                this.isLoading = false;
                reject(xhr);
            }
            if(this.body === undefined || this.body === null) {
                xhr.send();
            } else {
                xhr.send(this.body);
            }   
        }); 
        const xhr = new XMLHttpRequest();
    }

}
export { XhrClient };
