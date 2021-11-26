//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class.
//////////////////////////////////////////////////////////////////////
class Dom {

    static NAME_SPACE_URI_MATH_ML = 'http://www.w3.org/1998/Math/MathML';
    static NAME_SPACE_URI_HTML = 'http://www.w3.org/1999/xhtml';
    static NAME_SPACE_URI_SVG = 'http://www.w3.org/2000/svg';
    static TAG_A = 'A';
    static TAG_BUTTON = 'BUTTON';
    static TAG_DIV = 'DIV';
    static TAG_H1 = 'H1';
    static TAG_H2 = 'H2';
    static TAG_H3 = 'H3';
    static TAG_H4 = 'H4';
    static TAG_H5 = 'H5';
    static TAG_H6 = 'H6';
    static TAG_LI = 'LI';
    static TAG_P = 'P';
    static TAG_SPAN = 'SPAN';
    static TAG_SVG = 'SVG';
    static TAG_TABLE = 'TABLE';
    static TAG_TD = 'TD';
    static TAG_TH = 'TH';
    static TAG_TR = 'TR';
    static TAG_Ul = 'UL';
    static TAG_USE = 'USE';

    //////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////
    constructor() {
        //this.fragment = document.createDocumentFragment();
        this.htmlElement = null;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a HTML element.
    //////////////////////////////////////////////////////////////////////
    GenerateHtmlElement(tagName) {
        this.htmlElement = document.createElement(tagName);
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a HTML element NS.
    //////////////////////////////////////////////////////////////////////
    GenerateHtmlElementNs(nameSpaceUri, qualifiedName) {
        this.htmlElement = document.createElementNS(nameSpaceUri, qualifiedName);
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a HTML element NS for SVG.
    //////////////////////////////////////////////////////////////////////
    GenerateHtmlElementNsSvg() {
        this.htmlElement = document.createElementNS(this.nameSpaceUriSvg, this.tagSvg.toLowerCase());
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Get the HTML element.
    //////////////////////////////////////////////////////////////////////
    GetHtmlElement() {
        return this.htmlElement;
    }


    //////////////////////////////////////////////////////////////////////
    // Set attribute list.
    // @params:
    //     attrList: Array: e.g. [{ name: 'NAME1', value: 'VALUE1' }, { name: 'NAME2', value: 'VALUE2' }]
    //////////////////////////////////////////////////////////////////////
    SetAttrList(attrList) {
        if(attrList == null || attrList.length === 0) {
            return this;
        }
        for(let i = 0; i < attrList.length; i++) {
            const obj = attrList[i];
            if(obj.hasOwnProperty('name') && obj.hasOwnProperty('value')) {
                this.htmlElement.setAttribute(obj.name, obj.value);
            }
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set class list.
    // @params:
    //     classList: Array: e.g. ["CLASS-A", "CLASS-B"].
    //////////////////////////////////////////////////////////////////////
    SetClassList(classList) {
        if(classList != null && classList.length > 0) {
            this.htmlElement.classList.add(...classList);
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set content list.
    // @params:
    //     contentList: Array: e.g. ["TEXT_A", "CLASS_B", HTML_ELEMENT_A].
    //////////////////////////////////////////////////////////////////////
    SetContentList(contentList) {
        if(contentList == null || contentList.length === 0) {
            return this;
        }
        for(let i = 0; i < contentList.length; i++) {
            const v = contentList[i];
            if(typeof v === 'string' || v instanceof String || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint') {
                this.htmlElement.textContent = v;
            } else if(typeof v === 'object' && v.nodeName !== undefined) {
                this.htmlElement.appendChild(v);
            }
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set dataset.
    // @params:
    //     dataset: Object: e.g. { key1: "VAL1", key2: "VAL2" }.
    //////////////////////////////////////////////////////////////////////
    SetDataset(dataset) {
        if(dataset != null) {
            return this;
        }
        for(const key in dataset) {
            this.htmlElement.dataset[key] = dataset[key];
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set ID.
    // @params:
    //     id: String: "UNIQUE_ID"
    //////////////////////////////////////////////////////////////////////
    SetId(id) {
        if(id != null) {
            this.htmlElement.id = id;
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set attribute list to the specified element.
    // @params:
    //     attrList: Array: e.g. [{ name: 'NAME1', value: 'VALUE1' }, { name: 'NAME2', value: 'VALUE2' }]
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    static SetAttrListToSpecifiedElm(attrList, specifiedElm) {
        if(attrList == null || attrList.length === 0) {
            return;
        }
        for(let i = 0; i < attrList.length; i++) {
            const obj = attrList[i];
            if(obj.hasOwnProperty('name') && obj.hasOwnProperty('value')) {
                specifiedElm.setAttribute(obj.name, obj.value);
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Remove all child elements.
    //////////////////////////////////////////////////////////////////////
    static RemoveAllChildren(elm) {
        if(elm == null) {
            return;
        }
        while(elm.firstChild) {
            elm.firstChild.remove();
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Set class list to the specified element.
    // @params:
    //     classList: Array: e.g. ["CLASS-A", "CLASS-B"].
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    static SetClassListToSpecifiedElm(classList, specifiedElm) {
        if(classList != null && classList.length > 0) {
            specifiedElm.classList.add(...classList);
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Set content list to the specified element.
    // @params:
    //     contentList: Array: e.g. ["TEXT_A", "CLASS_B", HTML_ELEMENT_A].
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    static SetContentListToSpecifiedElm(contentList, specifiedElm) { 
        if(contentList == null || contentList.length === 0) {
            return;
        }
        for(let i = 0; i < contentList.length; i++) {
            const v = contentList[i];
            if(typeof v === 'string' || v instanceof String || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint') {
                specifiedElm.textContent = v;
            } else if(typeof v === 'object' && v.nodeName !== undefined) {
                specifiedElm.appendChild(v);
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Set dataset to the specified element.
    // @params:
    //     dataset: Object: e.g. { key1: "VAL1", key2: "VAL2" }.
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    static SetDatasetToSpecifiedElm(dataset, specifiedElm) {
        if(dataset != null) {
            return this;
        }
        for(const key in dataset) {
            specifiedElm.dataset[key] = dataset[key];
        }
        return this;
    }



    //////////////////////////////////////////////////////////////////////
    // Set ID to the specified element.
    // @params:
    //     id: String: "UNIQUE_ID"
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    static SetIdToSpecifiedElm(id, specifiedElm) {
        if(id != null) {
            specifiedElm.id = id;
        }
        return this;
    }

}
export { Dom };
