//////////////////////////////////////////////////////////////////////
// element.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class.
//////////////////////////////////////////////////////////////////////
class Element {

    //////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////
    constructor(elm) {
        this.htmlElement = elm;
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
        if(attrList === undefined || attrList === null || attrList.length === 0) {
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
        if(classList !== undefined && classList !== null && classList.length > 0) {
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
        if(contentList === undefined || contentList === null || contentList.length === 0) {
            return this;
        }
        for(let i = 0; i < contentList.length; i++) {
            const v = contentList[i];
            if(typeof v === 'string' || v instanceof String || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint') {
                this.htmlElement.insertAdjacentHTML('beforeend', v);
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
        if(dataset === undefined || dataset === null) {
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
        if(id !== undefined && id !== null) {
            this.htmlElement.id = id;
        }
        return this;
    }

}
export { Element };
