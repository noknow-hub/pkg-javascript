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
        this.editor.addEventListener('beforeinput', (event) => { this.beforeinputEvent(event); });
        this.editor.addEventListener('input', (event) => { this.inputEvent(event); });
        this.editor.addEventListener('keydown', (event) => { this.keydownEvent(event); });
        this.editor.addEventListener('paste', (event) => { this.pasteEvent(event); });
    }


    beforeinputEvent(event) {
console.log(event);
event.stopPropagation();

        if(event.inputType === 'insertText') {
            const sel = window.getSelection();
            const aNode = sel.anchorNode;
            const parentElm = aNode.parentElement;

            if(parentElm === this.editor) {
                const p = document.createElement('P');
                parentElm.insertAdjacentElement('beforeend', p);
                p.appendChild(aNode);
                const range = sel.getRangeAt(0);
                range.setStart(aNode, aNode.length);
                range.setEnd(aNode, aNode.length);
                sel.removeAllRanges();
                sel.addRange(range);
            }


        } else if(event.inputType === 'deleteContentBackward') {
/*
            const ranges = event.getTargetRanges();
console.log(ranges);
            if(ranges.length !== 1) {
                return;
            }
            const range = ranges[0];
*/
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Optimize editor content
    //////////////////////////////////////////////////////////////////////
    optimizeEditorContent() {
        // Remove style attribute
        let tmpElms = this.editor.querySelectorAll('[style]');
        for(let i = 0; i < tmpElms.length; i++) {
            tmpElms[i].removeAttribute('style');
        }
        
    }

    //////////////////////////////////////////////////////////////////////
    // Input event
    //////////////////////////////////////////////////////////////////////
    inputEvent(event) {
console.log(event);
        event.preventDefault();

//console.log(window.clipboardData);
//console.log('check: ', 'https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes');
        if(event.inputType === 'insertText') {
            const sel = window.getSelection();
            const aNode = sel.anchorNode;
            const parentElm = aNode.parentElement;

            if(parentElm === this.editor) {
                const p = document.createElement('P');
                parentElm.insertAdjacentElement('beforeend', p);
                p.appendChild(aNode);
                const range = sel.getRangeAt(0);
                range.setStart(aNode, aNode.length);
                range.setEnd(aNode, aNode.length);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            
            // Optimize editor content
            this.optimizeEditorContent();
        } else if(event.inputType === 'insertFromPaste') {
            // Optimize editor content
            this.optimizeEditorContent();
        } else if(event.inputType === 'insertParagraph') {
            
        } else if(event.inputType === 'deleteContentBackward') {
            // Optimize editor content
            this.optimizeEditorContent();

/*
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            const aNode = sel.anchorNode;
            const parentElm = aNode.parentElement;
            const parentElmNext = parentElm.nextElementSibling;
console.log('parentElement: ', aNode.parentElement);
*/

/*
            if(parentElm != null) {
                const newNodes = [];
                const nodes = parentElm.childNodes;
                for(let i = 0; i < nodes.length; i++) {
                    const n = nodes[i];
                    if(n.nodeType === Node.TEXT_NODE) {
                        if(newNodes.length > 0 && newNodes[newNodes.length - 1].nodeType === Node.TEXT_NODE) {
                            newNodes[newNodes.length - 1].appendData(n.wholeText);
                        } else {
                            newNodes.push(n);
                        }
                    } else if(n.nodeType === Node.ELEMENT_NODE) {
                        // Remove style attribute
                        n.removeAttribute('style');

                        if(!n.hasAttribute('class') && n.nodeName.toLowerCase() === 'span') {
                            if(newNodes.length > 0 && newNodes[newNodes.length - 1].nodeType === Node.TEXT_NODE) {
                            newNodes[newNodes.length - 1].appendData(n.textContent);
                            } else {
                                newNodes.push(n);
                            }
                        }
                    }
                }
console.log(newNodes);
//                parentElm.appendChild(newNodes);
            }
*/

            // Next sibling node
/*
            let tmpSibling = aNode;
            while(tmpSibling = tmpSibling.nextSibling) {
                if(tmpSibling.nodeType === Node.ELEMENT_NODE) {
                    if(tmpSibling.nodeName.toLowerCase() === 'span') {
                        tmpSibling.replaceWith(tmpSibling.textContent);
                    } else {
                        tmpSibling.removeAttribute('style');
                    }
                }
            }

            if(parentElm != null) {
                // Parent element
                if(parentElm.nodeName.toLowerCase() === 'span') {
                    parentElm.replaceWith(parentElm.textContent);
                } else {
                    parentElm.removeAttribute('style');
                }

                // Parent element children
                for(let i = 0; i < parentElm.children.length; i++) {
                    const e = parentElm.children[i];
                    if(e.nodeName.toLowerCase() === 'span') {
                        e.replaceWith(e.textContent);
                        i--;
                    } else {
                        e.removeAttribute('style');
                    }
                }

                // Next sibling element
                tmpSibling = parentElm;
                for(let tmpSibling = parentElm; tmpSibling != null;  tmpSibling = tmpSibling.nextElementSibling) {
                    if(tmpSibling.nodeType === Node.ELEMENT_NODE) {
                        if(tmpSibling.nodeName.toLowerCase() === 'span') {
                            tmpSibling.replaceWith(tmpSibling.textContent);
                        } else {
                            tmpSibling.removeAttribute('style');
                        }   
                    } 
                }
            }
*/

/*
console.log(aNode, aNode);
console.log('nodeName: ', aNode.nodeName);
console.log('nextSibling: ', aNode.nextSibling);
console.log('parentElement: ', aNode.parentElement);
console.log('nextElementSibling: ', aNode.parentElement.nextElementSibling);
*/
        }




        if(event.inputType === 'insertFromPaste') {
            return;
        }

        // Check if the first data or not
        if(this.isEmptyEditor) {
//            this.editor.innerHTML = `<p>${event.data}</p>`;
//            this.editor.focus();
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
//console.log(event.keyCode);
        if(event.keyCode === 8) {
            // Backspace
            //event.stopPropagation();
            //return false;
        } else if (event.keyCode === 13) {
            // Enter
            return false;
            //event.preventDefault();


return;
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
