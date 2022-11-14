//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////
class Range {


    //////////////////////////////////////////////////////////////////////
    // Move the cursor to the end
    //////////////////////////////////////////////////////////////////////
    static MoveCursorToEnd(elm) {
        if(elm === undefined || elm === null) {
            return;
        }
        let i = 0;
        if(elm.tagName.toLowerCase() === 'input' || elm.tagName.toLowerCase() === 'textarea') {
            i = elm.value.length;
        } else if(elm.contentEditable) {
            i = elm.textContent.length;
        } else {
            return;
        }
        elm.setSelectionRange(i, i);
    }



}
export { Range };
