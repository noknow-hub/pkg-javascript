//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////
import { Editor } from './model/editor.js';
import { StatusBar } from './model/status_bar.js';
import { Toolbar } from './model/toolbar.js';

class TextEditor {

    static CLASS_NAME = 'text-editor';
    static OPTION_KEY_STATUS_BAR = 'statusBar';
    static OPTION_KEY_STATUS_BAR_DISPLAY = 'display';
    static OPTION_KEY_STATUS_BAR_NUM_OF_CHARS = 'numOfChars';
    static OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT = 'numOfCharsText';
    static OPTION_KEY_TOOLBAR = 'toolbar';
    static OPTION_KEY_TOOLBAR_BOLD = 'bold';
    static OPTION_KEY_TOOLBAR_DISPLAY = 'display';
    static OPTION_KEY_TOOLBAR_ITALIC = 'italic';
    static OPTION_VAL_STATUS_BAR_NUM_OF_CHARS_TEXT = 'chars';
    static SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(targetElm, option = null) {
        //this.targetElm = targetElm;
        if(targetElm === undefined || targetElm === null) {
            console.log('[ERROR] Initialization error. The specified element could not be loaded.');
            return;
        }
        this.option = {
            [TextEditor.OPTION_KEY_STATUS_BAR]: {
                [TextEditor.OPTION_KEY_STATUS_BAR_DISPLAY]: false,
                [TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS]: true,
                [TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT]: TextEditor.OPTION_VAL_STATUS_BAR_NUM_OF_CHARS_TEXT,
            },
            [TextEditor.OPTION_KEY_TOOLBAR]: {
                [TextEditor.OPTION_KEY_TOOLBAR_BOLD]: true,
                [TextEditor.OPTION_KEY_TOOLBAR_DISPLAY]: false,
                [TextEditor.OPTION_KEY_TOOLBAR_ITALIC]: true
            }
        };

        // Set option
        this.setOption(option);

        this.container = document.createElement('DIV');
        this.editor = new Editor(this.container, targetElm, this.option);
        this.statusBar = new StatusBar(this.container, this.option);
        this.toolbar = new Toolbar(this.container, this.option);

        // Initialize
        this.init(targetElm);
    }


    //////////////////////////////////////////////////////////////////////
    // Get the number of charcters
    //////////////////////////////////////////////////////////////////////
    GetNumOfChars() {
        return this.statusBar.numOfCahrs;
    }


    //////////////////////////////////////////////////////////////////////
    // Initialize
    //////////////////////////////////////////////////////////////////////
    init(targetElm) {
        // Container
        this.container.classList.add(TextEditor.CLASS_NAME);
        targetElm.insertAdjacentElement('beforebegin', this.container);
        this.container.appendChild(targetElm);

        // Editor
        this.editor.Run();

        // Toolbar
        this.toolbar.Run();

        // Status bar
        this.statusBar.Run();
    }


    //////////////////////////////////////////////////////////////////////
    // Set option
    //////////////////////////////////////////////////////////////////////
    setOption(option) {
        if(option === null) {
            return;
        }
        for(let key in option) {
            if(key === TextEditor.OPTION_KEY_STATUS_BAR) {
                for(let key in option[TextEditor.OPTION_KEY_STATUS_BAR]) {
                    if(key === TextEditor.OPTION_KEY_STATUS_BAR_DISPLAY ||
                            key === TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS ||
                            key === TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT) {
                        this.option[TextEditor.OPTION_KEY_STATUS_BAR][key] = option[TextEditor.OPTION_KEY_STATUS_BAR][key];
                    }
                }
            } else if(key === TextEditor.OPTION_KEY_TOOLBAR) {
                for(let key in option[TextEditor.OPTION_KEY_TOOLBAR]) {
                    if(key === TextEditor.OPTION_KEY_TOOLBAR_DISPLAY ||
                            key === TextEditor.OPTION_KEY_TOOLBAR_BOLD ||
                            key === TextEditor.OPTION_KEY_TOOLBAR_ITALIC) {
                        this.option[TextEditor.OPTION_KEY_TOOLBAR][key] = option[TextEditor.OPTION_KEY_TOOLBAR][key];
                    }
                }
            }
        }
    }

}
export { TextEditor };
