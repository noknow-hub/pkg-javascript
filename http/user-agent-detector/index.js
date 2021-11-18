//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class UserAgentDetector {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor() {
        this.ua = navigator.userAgent;
        this.mobileReg = new RegExp('Mobile|iP(hone|od|ad)|Android|BlackBerry', 'g');
    }


    //////////////////////////////////////////////////////////////////////
    // Is mobile
    //////////////////////////////////////////////////////////////////////
    IsMobile() {
        return this.mobileReg.test(this.ua);
    }

}
export { UserAgentDetector };