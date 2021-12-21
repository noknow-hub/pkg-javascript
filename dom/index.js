//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////
import { Element } from './element.js';

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
    static TAG_SMALL = 'SMALL';
    static TAG_SPAN = 'SPAN';
    static TAG_STRONG = 'STRONG';
    static TAG_SVG = 'SVG';
    static TAG_TABLE = 'TABLE';
    static TAG_TD = 'TD';
    static TAG_TH = 'TH';
    static TAG_TR = 'TR';
    static TAG_Ul = 'UL';
    static TAG_USE = 'USE';


    //////////////////////////////////////////////////////////////////////
    // New HTML element.
    //////////////////////////////////////////////////////////////////////
    static NewHtmlElement(tagName) {
        return new Element(document.createElement(tagName));
    }


    //////////////////////////////////////////////////////////////////////
    // New HTML element NS.
    //////////////////////////////////////////////////////////////////////
    static NewHtmlElementNs(nameSpaceUri, qualifiedName) {
        return new Element(document.createElementNS(nameSpaceUri, qualifiedName));
    }


    //////////////////////////////////////////////////////////////////////
    // New HTML element NS for SVG.
    //////////////////////////////////////////////////////////////////////
    static NewHtmlElementNsSvg() {
        return new Element(document.createElementNS(this.nameSpaceUriSvg, this.tagSvg.toLowerCase()));
    }

    //////////////////////////////////////////////////////////////////////
    // Set attribute list to the specified element.
    // @params:
    //     attrList: Array: e.g. [{ name: 'NAME1', value: 'VALUE1' }, { name: 'NAME2', value: 'VALUE2' }]
    //     specifiedElm: Object: The specified HTML element.
    //////////////////////////////////////////////////////////////////////
    static SetAttrListToSpecifiedElm(attrList, specifiedElm) {
        if(attrList === undefined || attrList === null || attrList.length === 0) {
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
        if(elm === undefined || elm === null) {
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
        if(classList !== undefined && classList !== null && classList.length > 0) {
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
        if(contentList === undefined || contentList === null || contentList.length === 0) {
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
        if(dataset === undefined || dataset === null) {
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
        if(id !== undefined && id !== null) {
            specifiedElm.id = id;
        }
        return this;
    }

}
export { Dom };
