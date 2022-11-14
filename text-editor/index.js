//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

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
        this.targetElm = targetElm;
        if(this.targetElm === undefined || this.targetElm === null) {
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
        this.container;
        this.editor;
        this.statusBar;
        this.toolbar;
        this.numOfCahrs = 0;

        // Set option
        this.setOption(option);

        // Initialize
        this.init();
    }


    //////////////////////////////////////////////////////////////////////
    // Get the number of charcters
    //////////////////////////////////////////////////////////////////////
    GetNumOfChars() {
        return this.numOfCahrs;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a container
    //////////////////////////////////////////////////////////////////////
    generateContainer() {
        this.container = document.createElement('div');
        this.container.classList.add(TextEditor.CLASS_NAME);
        this.targetElm.insertAdjacentElement('beforebegin', this.container);
        this.editor = this.targetElm.cloneNode(true);
        this.container.appendChild(this.editor);
        this.targetElm.remove();
        this.editor.addEventListener('input', (event) => { this.inputEventInTextEditor(event) });
        this.editor.addEventListener('keydown', (event) => { this.keydownEventInTextEditor(event) });
        this.editor.addEventListener('paste', (event) => { this.pasteEventInTextEditor(event) });
    }


    //////////////////////////////////////////////////////////////////////
    // Generate an Element for "tool-btn"
    //////////////////////////////////////////////////////////////////////
    generateElementToolBtn() {
        const btn = document.createElement('BUTTON');
        btn.classList.add('tool-btn');
        btn.type = 'button';
        return btn;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate an Element for "tool-btn"'s "icon"
    //////////////////////////////////////////////////////////////////////
    generateElementToolBtnIcon(svgContent) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('icon');
        svg.setAttribute('height', '24px');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', '24px');
        svg.innerHTML = svgContent;
        return svg;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a status bar
    //////////////////////////////////////////////////////////////////////
    generateStatusBar() {
        this.container.classList.add('has-status-bar');

        this.statusBar = document.createElement('DIV');
        this.statusBar.classList.add('status-bar');

        // left-box
        const leftBox = document.createElement('DIV');
        leftBox.classList.add('left-box');
        this.statusBar.appendChild(leftBox);

        // right-box
        const rightBox = document.createElement('DIV');
        rightBox.classList.add('right-box');
        this.statusBar.appendChild(rightBox);

        if(this.option[TextEditor.OPTION_KEY_STATUS_BAR][TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS]) {
            const btn = document.createElement('BUTTON');
            btn.classList.add('btn');
            btn.type = 'button';
            btn.textContent = `${this.numOfCahrs} ${this.option[TextEditor.OPTION_KEY_STATUS_BAR][TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT]}`;
            rightBox.appendChild(btn);
            this.statusBar.addEventListener('set-num-of-chars', (event) => {
                const detail = event.detail;
                if(detail === undefined || detail === null) {
                    return;
                }
                btn.textContent = `${detail} ${this.option[TextEditor.OPTION_KEY_STATUS_BAR][TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT]}`;
            });
        }
        
        if(this.toolbar) {
            this.toolbar.insertAdjacentElement('afterend', this.statusBar);
        } else {
            this.container.insertAdjacentElement('beforeend', this.statusBar);
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a toolbar
    //////////////////////////////////////////////////////////////////////
    generateToolbar() {
        this.container.classList.add('has-toolbar');

        this.toolbar = document.createElement('DIV');
        this.toolbar.classList.add('toolbar');

        const formatGroup = document.createElement('DIV');
        formatGroup.classList.add('group');
        this.toolbar.insertAdjacentElement('afterbegin', formatGroup);

        // Bold
        if(this.option[TextEditor.OPTION_KEY_TOOLBAR][TextEditor.OPTION_KEY_TOOLBAR_BOLD] === true) {
            const btn = this.generateElementToolBtn();
            const svg = this.generateElementToolBtnIcon('<path d="M7 18V4h5.5q1.7 0 2.975 1.025Q16.75 6.05 16.75 7.65q0 .95-.5 1.762-.5.813-1.35 1.238v.2q1.05.35 1.7 1.237.65.888.65 2.013 0 1.725-1.387 2.813Q14.475 18 12.65 18Zm2.65-8.3h2.65q.75 0 1.325-.475t.575-1.2q0-.725-.575-1.2T12.3 6.35H9.65Zm0 5.9h2.85q.85 0 1.475-.513.625-.512.625-1.312t-.625-1.313q-.625-.512-1.475-.512H9.65Z"/>');
            btn.appendChild(svg);
            const tooltip = document.createElement('DIV');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = '<p class="heading">Bold</p><p class="text">⌘b</p>';
            btn.appendChild(tooltip);
            formatGroup.appendChild(btn);
        }

        // Italic
        if(this.option[TextEditor.OPTION_KEY_TOOLBAR][TextEditor.OPTION_KEY_TOOLBAR_ITALIC] === true) {
            const btn = this.generateElementToolBtn();
            const svg = this.generateElementToolBtnIcon('<path d="M5 20v-3h3.375l4-10H9V4h10v3h-3.375l-4 10H15v3Z"/>');
            btn.appendChild(svg);
            const tooltip = document.createElement('DIV');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = '<p class="heading">Italic</p><p class="text">⌘i</p>';
            btn.appendChild(tooltip);
            formatGroup.appendChild(btn);
        }



        this.toolbar.appendChild(formatGroup);
        this.container.insertAdjacentElement('beforeend', this.toolbar);
    }


    //////////////////////////////////////////////////////////////////////
    // Initialize
    //////////////////////////////////////////////////////////////////////
    init() {
        // Container
        this.generateContainer();

        // Toolbar
        if(this.option[TextEditor.OPTION_KEY_TOOLBAR][TextEditor.OPTION_KEY_TOOLBAR_DISPLAY]) {
            this.generateToolbar();
        }
        
        // Status bar
        if(this.option[TextEditor.OPTION_KEY_STATUS_BAR][TextEditor.OPTION_KEY_STATUS_BAR_DISPLAY]) {
            this.generateStatusBar();
        }

        
    }


    //////////////////////////////////////////////////////////////////////
    // Input event in the text editor
    //////////////////////////////////////////////////////////////////////
    inputEventInTextEditor(event) {
console.log(event.data);
        event.preventDefault();
        

        // Set the number of chars
        this.numOfCahrs = this.editor.textContent.length;
        let customEvent = new CustomEvent('set-num-of-chars', { detail: this.numOfCahrs });
        this.statusBar.dispatchEvent(customEvent);

        
    }


    //////////////////////////////////////////////////////////////////////
    // keydown event in the text editor
    //////////////////////////////////////////////////////////////////////
    keydownEventInTextEditor(event) {
        // Enter key
        if (event.keyCode === 13) {
            event.preventDefault();
            document.execCommand('insertHTML', false, '<br>');
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Paste event in the text editor
    //////////////////////////////////////////////////////////////////////
    pasteEventInTextEditor(event) {
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, text);
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
