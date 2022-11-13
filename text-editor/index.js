//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

class TextEditor {

    static CLASS_NAME = 'text-editor';
    static OPTION_KEY_STATUS_BAR = 'status-bar';
    static OPTION_KEY_STATUS_BAR_NUM_OF_CHARS = 'num-of-chars';
    static OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT = 'num-of-chars-text';
    static OPTION_KEY_TOOL_BAR = 'tool-bar';
    static OPTION_KEY_TOOL_BAR_BOLD = 'bold';
    static OPTION_VAL_STATUS_BAR_NUM_OF_CHARS_TEXT = 'Chars';

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(targetElm, option = null) {
        this.targetElm = targetElm;
        if(this.targetElm === undefined || this.targetElm === null) {
            console.log('[ERROR] Initialization error. The specified element could not be loaded.');
            return;
        }
        this.option = {
            [TextEditor.OPTION_KEY_STATUS_BAR]: {
                [TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS]: false,
                [TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT]: TextEditor.OPTION_VAL_STATUS_BAR_NUM_OF_CHARS_TEXT,
            },
            [TextEditor.OPTION_KEY_TOOL_BAR]: {
                [TextEditor.OPTION_KEY_TOOL_BAR_BOLD]: false
            }
        };

        // Set option
        this.setOption(option);

        // Initialize
        this.init();
    }


    //////////////////////////////////////////////////////////////////////
    // Initialize
    //////////////////////////////////////////////////////////////////////
    init() {
        this.targetElm.classList.add(TextEditor.CLASS_NAME);
        
        
        
        
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
                    if(key === TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS ||
                            key === TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT) {
                        this.option[TextEditor.OPTION_KEY_STATUS_BAR][key] = option[TextEditor.OPTION_KEY_STATUS_BAR][key];
                    }
                }
            } else if(key === TextEditor.OPTION_KEY_TOOL_BAR) {
                for(let key in option[TextEditor.OPTION_KEY_TOOL_BAR]) {
                    if(key === TextEditor.TextEditor.OPTION_KEY_TOOL_BAR_BOLD) {
                        this.option[TextEditor.OPTION_KEY_TOOL_BAR][key] = option[TextEditor.OPTION_KEY_TOOL_BAR][key];
                    }
                }
            }
        }
    }



}
export { TextEditor };
