//////////////////////////////////////////////////////////////////////
// dom.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class.
//////////////////////////////////////////////////////////////////////
class Dom {

    //////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////
    constructor() {
        this.nameSpaceUriMathMl = 'http://www.w3.org/1998/Math/MathML';
        this.nameSpaceUriHtml = 'http://www.w3.org/1999/xhtml';
        this.nameSpaceUriSvg = 'http://www.w3.org/2000/svg';
        this.tagA = 'A';
        this.tagButton = 'BUTTON';
        this.tagDiv = 'DIV';
        this.tagH1 = 'H1';
        this.tagH2 = 'H2';
        this.tagH3 = 'H3';
        this.tagH4 = 'H4';
        this.tagH5 = 'H5';
        this.tagH6 = 'H6';
        this.tagLi = 'LI';
        this.tagP = 'P';
        this.tagSpan = 'SPAN';
        this.tagSvg = 'SVG';
        this.tagTable = 'TABLE';
        this.tagTd = 'TD';
        this.tagTh = 'TH';
        this.tagTr = 'TR';
        this.tagUl = 'UL';
        this.tagUse = 'USE';

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
    // Remove all child elements.
    //////////////////////////////////////////////////////////////////////
    RemoveAllChildren(elm) {
        if(elm == null) {
            return;
        }
        while(elm.firstChild) {
            elm.firstChild.remove();
        }
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
    // Set attribute list to the specified element.
    // @params:
    //     attrList: Array: e.g. [{ name: 'NAME1', value: 'VALUE1' }, { name: 'NAME2', value: 'VALUE2' }]
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    SetAttrListToSpecifiedElm(attrList, specifiedElm) {
        if(attrList == null || attrList.length === 0) {
            return this;
        }
        for(let i = 0; i < attrList.length; i++) {
            const obj = attrList[i];
            if(obj.hasOwnProperty('name') && obj.hasOwnProperty('value')) {
                specifiedElm.setAttribute(obj.name, obj.value);
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
    // Set class list to the specified element.
    // @params:
    //     classList: Array: e.g. ["CLASS-A", "CLASS-B"].
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    SetClassListToSpecifiedElm(classList, specifiedElm) {
        if(classList != null && classList.length > 0) {
            specifiedElm.classList.add(...classList);
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
    // Set content list to the specified element.
    // @params:
    //     contentList: Array: e.g. ["TEXT_A", "CLASS_B", HTML_ELEMENT_A].
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    SetContentListToSpecifiedElm(contentList, specifiedElm) { 
        if(contentList == null || contentList.length === 0) {
            return this;
        }
        for(let i = 0; i < contentList.length; i++) {
            const v = contentList[i];
            if(typeof v === 'string' || v instanceof String || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint') {
                specifiedElm.textContent = v;
            } else if(typeof v === 'object' && v.nodeName !== undefined) {
                specifiedElm.appendChild(v);
            }
        }
        return this;
    }


    //////////////////////////////////////////////////////////////////////
    // Set dataset.
    // @params:
    //     dataset: Object: e.g. { key1: "VAL1", key2: "VAL2" }.
    //////////////////////////////////////////////////////////////////////
    static SetDataset(dataset) {
        if(dataset != null) {
            return this;
        }
        for(const key in dataset) {
            this.htmlElement.dataset[key] = dataset[key];
        }
        return this;
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
    // Set ID.
    // @params:
    //     id: String: "UNIQUE_ID"
    //////////////////////////////////////////////////////////////////////
    static SetId(id) {
        if(id != null) {
            this.htmlElement.id = id;
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
