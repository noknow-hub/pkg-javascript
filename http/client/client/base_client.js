//////////////////////////////////////////////////////////////////////
// base_client.js
//////////////////////////////////////////////////////////////////////
import { Header } from '../header.js';

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class BaseClient {

    static HTTP_METHOD_GET = 'GET';
    static HTTP_METHOD_POST = 'POST';
    static HTTP_METHOD_PATCH = 'PATCH';
    static HTTP_METHOD_PUT = 'PUT';
    static HTTP_METHOD_DELETE = 'DELETE';

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(url) {
        this.url = url;
        this.header = new Header();
        this.body;
        this.method;
        this.timeout;
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
    // Set body.
    //////////////////////////////////////////////////////////////////////
    SetBody(body) {
        this.body = body;
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