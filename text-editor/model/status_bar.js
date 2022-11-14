//////////////////////////////////////////////////////////////////////
// status_bar.js
//////////////////////////////////////////////////////////////////////
import { TextEditor } from '../index.js';

class StatusBar {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(container, option) {
        this.container = container;
        this.option = option;

        this.statusBar = document.createElement('DIV');

        this.numOfCahrs = 0;
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(!this.option[TextEditor.OPTION_KEY_STATUS_BAR][TextEditor.OPTION_KEY_STATUS_BAR_DISPLAY]) {
            return;
        }

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
            this.container.addEventListener('set-num-of-chars', (event) => {
                const detail = event.detail;
                if(detail === undefined || detail === null) {
                    return;
                }
                btn.textContent = `${detail} ${this.option[TextEditor.OPTION_KEY_STATUS_BAR][TextEditor.OPTION_KEY_STATUS_BAR_NUM_OF_CHARS_TEXT]}`;
            });
        }

        this.container.insertAdjacentElement('beforeend', this.statusBar);
    }

}
export { StatusBar };
