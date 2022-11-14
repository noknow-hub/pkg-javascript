//////////////////////////////////////////////////////////////////////
// editor.js
//////////////////////////////////////////////////////////////////////
class Editor {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(container, editorElm, option) {
        this.container = container;
        this.editor = editorElm;
        this.option = option;

        this.isEmptyEditor = true;
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        this.editor.addEventListener('input', (event) => { this.inputEvent(event) });
        this.editor.addEventListener('keydown', (event) => { this.keydownEvent(event) });
        this.editor.addEventListener('paste', (event) => { this.pasteEvent(event) });
    }


    //////////////////////////////////////////////////////////////////////
    // Input event
    //////////////////////////////////////////////////////////////////////
    inputEvent(event) {
console.log(event);
        event.preventDefault();

console.log(window.clipboardData);
console.log('check: ', 'https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes');
        if(event.inputType === 'insertFromPaste') {
            return;
        }

        // Check if the first data or not
        if(this.isEmptyEditor) {
            this.editor.innerHTML = `<p>${event.data}</p>`;
            this.editor.focus();
        }


        // Set the number of chars
        this.numOfCahrs = this.editor.textContent.length;
        let customEvent = new CustomEvent('set-num-of-chars', { detail: this.numOfCahrs });
        this.container.dispatchEvent(customEvent);

        // Set the "this.isEmptyEditor"
        if(this.numOfCahrs === 0) {
            this.isEmptyEditor = true;
        } else {
            this.isEmptyEditor = false;
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Keydown event
    //////////////////////////////////////////////////////////////////////
    keydownEvent(event) {
        // Enter key
        if (event.keyCode === 13) {
            event.preventDefault();
            let sel = window.getSelection();
            const aNode = sel.anchorNode;
            const aOffset = sel.anchorOffset;
            let range = sel.getRangeAt(0);
console.log(aNode);
console.log(aOffset);
            if(aNode.nodeType === Node.TEXT_NODE) {
                const beforeText = aNode.textContent.substring(0, aOffset);
                const beforeTextNode = document.createTextNode(beforeText);
                const afterText = aNode.textContent.substring(aOffset);
                const afterTextNode = document.createTextNode(afterText);
                const parentElm = aNode.parentElement;
                if(parentElm.tagName.toLowerCase() === 'p') {
                    const beforeTextP = document.createElement('P');
                    beforeTextP.textContent = beforeText;
                    const afterTextP = document.createElement('P');
                    afterTextP.textContent = afterText;
    
                    parentElm.innerHTML = `${beforeText}`;
                    parentElm.insertAdjacentElement('afterend', afterTextP);

                    sel = window.getSelection();
                    range = sel.getRangeAt(0);
                    range.setStart(afterTextP, 0);
                    range.setEnd(afterTextP, 0);
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else {
                    parentElm.innerHTML = `${beforeText}<br>${afterText}`;
                }
            } else {
                this.editor.insertAdjacentHTML('beforeend', '<p><br></p>');
            }
//console.log(range);

/*
            const i = this.editor.childNodes.length;
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            range.setStart(this.editor, i);
            //range.setEnd(this.editor, i);
            sel.removeAllRanges();
            sel.addRange(range);
*/
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Paste event
    //////////////////////////////////////////////////////////////////////
    pasteEvent(event) {
//        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
//        document.execCommand('insertHTML', false, text);
    }


}
export { Editor };
