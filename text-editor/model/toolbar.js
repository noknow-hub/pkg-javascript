//////////////////////////////////////////////////////////////////////
// toolbar.js
//////////////////////////////////////////////////////////////////////
import { TextEditor } from '../index.js';

class Toolbar {

    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    constructor(container, option) {
        this.container = container;
        this.option = option;

        this.toolbar = document.createElement('DIV');
    }


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    Run() {
        if(!this.option[TextEditor.OPTION_KEY_TOOLBAR][TextEditor.OPTION_KEY_TOOLBAR_DISPLAY]) {
            return;
        }

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

}
export { Toolbar };
