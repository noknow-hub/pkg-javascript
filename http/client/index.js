//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////
import { FetchClient } from './client/fetch_client.js';
import { XhrClient } from './client/xhr_client.js';

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class Client {

    static FETCH_MODE_NO_CORS = 'no-cors';
    static FETCH_MODE_DEFAULT = 'cors';
    static FETCH_MODE_SAME_ORIGIN = 'same-origin';
    static FETCH_CREDENTIALS_OMIT  = 'omit';
    static FETCH_CREDENTIALS_SAME_ORIGIN  = 'same-origin';
    static FETCH_CREDENTIALS_INCLUDE  = 'include';
    static HEADER_ACCEPT_LANGUAGE = 'Accept-Language';
    static HEADER_CONTENT_TYPE = 'Content-Type';
    static HEADER_MEDIA_TYPE_APPLICATION_JSON = 'application/json';
    static HTTP_METHOD_GET = 'GET';
    static HTTP_METHOD_POST = 'POST';
    static HTTP_METHOD_PATCH = 'PATCH';
    static HTTP_METHOD_PUT = 'PUT';
    static HTTP_METHOD_DELETE = 'DELETE';

    //////////////////////////////////////////////////////////////////////
    // New FetchClient.
    //////////////////////////////////////////////////////////////////////
    static NewFetchClient(url) {
        return new FetchClient(url);
    }


    //////////////////////////////////////////////////////////////////////
    // New XhrClient.
    //////////////////////////////////////////////////////////////////////
    static NewXhrClient(url) {
        return new XhrClient(url);
    }

}
export { Client };
