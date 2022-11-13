//////////////////////////////////////////////////////////////////////
// string.js
//////////////////////////////////////////////////////////////////////
class String {


    //////////////////////////////////////////////////////////////////////
    // Escape HTML
    //////////////////////////////////////////////////////////////////////
    static EscapeHtml(str) {
        return str.replaceAll('&', '&amp;').
                replaceAll('<', '&lt;').
                replaceAll('>', '&gt;').
                replaceAll('"', '&quot;').
                replaceAll("'", '&#039;');
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a random string
    //////////////////////////////////////////////////////////////////////
    static GenerateRandomString(len, charSet = null) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for(let i = 0; i < len; i++) {
            const pos = Math.floor(Math.random() * charSet.length);
            str = `${str}${charSet.substring(pos, pos + 1)}`;
        }
        return str;
    }


    //////////////////////////////////////////////////////////////////////
    // Replace line breaks to br element
    //////////////////////////////////////////////////////////////////////
    static ReplaceLineBreaksToBr(str) {
        return str.replace(/(\r\n|\r|\n)/g, '<br>');
    }



}
export { String };
