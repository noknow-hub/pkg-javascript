//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class ModalWindow {

    static CLASS_NAME = 'nkw-modal-window';
    static CLASS_NAME_ACTIVE = 'active';
    static CURRENT_Z_INDEX = 10;
    static DATASET_ACTION_CLOSE = '[data-modal-action="close"]';
    static DATASET_TARGET = '[data-modal-target]';
    static DATASET_TARGET_KEY = 'modalTarget';
    static DATASET_ID_KEY = 'data-modal-id';


    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    static Run() {
        const modals = document.getElementsByClassName(ModalWindow.CLASS_NAME);
        if(modals === undefined || modals === null || modals.length === 0) {
            return;
        }
        for(let i = 0; i < modals.length; i++) {
            const modal = modals[i];
            modal.removeEventListener('click', (event) => { ModalWindow.clkParentModalWindow(event); });
            modal.addEventListener('click', (event) => { ModalWindow.clkParentModalWindow(event); });
            const closeBtns = modal.querySelectorAll(ModalWindow.DATASET_ACTION_CLOSE);
            if(closeBtns === undefined || closeBtns === null || closeBtns.length === 0) {
                continue;
            }
            for(let j = 0; j < closeBtns.length; j++) {
                const closeBtn = closeBtns[j];
                closeBtn.removeEventListener('click', () => { ModalWindow.clkCloseBtn(modal); });
                closeBtn.addEventListener('click', () => { ModalWindow.clkCloseBtn(modal); });
            }
        }
        const modalTargets = document.querySelectorAll(ModalWindow.DATASET_TARGET);
        if(modalTargets === undefined || modalTargets === null || modalTargets.length === 0) {
            return;
        }
        for(let i = 0; i < modalTargets.length; i++) {
            const modalTarget = modalTargets[i];
            modalTarget.removeEventListener('click', () => { ModalWindow.clkTargetBtn(modalTarget.dataset[ModalWindow.DATASET_TARGET_KEY]); });
            modalTarget.addEventListener('click', () => { ModalWindow.clkTargetBtn(modalTarget.dataset[ModalWindow.DATASET_TARGET_KEY]); });
        }

    }


    //////////////////////////////////////////////////////////////////////
    // Append the event for opening modal.
    //////////////////////////////////////////////////////////////////////
    static AppendEventOpeningModal(elm) {
        elm.addEventListener('click', () => { ModalWindow.clkTargetBtn(elm.dataset[ModalWindow.DATASET_TARGET_KEY]); });
    }


    //////////////////////////////////////////////////////////////////////
    // Close modal.
    //////////////////////////////////////////////////////////////////////
    static CloseModal(modalWindow = null) {
        let elms;
        if(modalWindow !== undefined && modalWindow !== null) {
            elms = [modalWindow];
        } else {
            elms = document.getElementsByClassName(ModalWindow.CLASS_NAME);
        }
        if(elms === undefined || elms === null) {
            return;
        }
        for(let i = 0; i < elms.length; i++) {
            const e = elms[i];
            if(e.classList.contains(ModalWindow.CLASS_NAME_ACTIVE)) {
                ModalWindow.styleZIndex(e, false);
                e.classList.remove(ModalWindow.CLASS_NAME_ACTIVE);
            }
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the parent modal window.
    //////////////////////////////////////////////////////////////////////
    static clkParentModalWindow(event) {
        if(event.target.classList.contains(ModalWindow.CLASS_NAME) && event.target.classList.contains(ModalWindow.CLASS_NAME_ACTIVE)) {
            ModalWindow.styleZIndex(event.target, false);
            event.target.classList.remove(ModalWindow.CLASS_NAME_ACTIVE);
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the close button.
    //////////////////////////////////////////////////////////////////////
    static clkCloseBtn(modalWindow) {
        ModalWindow.styleZIndex(modalWindow, false);
        modalWindow.classList.remove(ModalWindow.CLASS_NAME_ACTIVE);
    }


    //////////////////////////////////////////////////////////////////////
    // Handle to click the open button.
    //////////////////////////////////////////////////////////////////////
    static clkTargetBtn(dataSetValue) {
        const modal = document.querySelector(`[${ModalWindow.DATASET_ID_KEY}="${dataSetValue}"]`);
        if(modal === undefined || modal === null) {
            return;
        }
        ModalWindow.styleZIndex(modal, true);
        modal.classList.add(ModalWindow.CLASS_NAME_ACTIVE);
    }


    //////////////////////////////////////////////////////////////////////
    // Style `z-index`.
    //////////////////////////////////////////////////////////////////////
    static styleZIndex(modalWindow, isIncrement) {
        if(isIncrement) {
            ModalWindow.CURRENT_Z_INDEX++;
            modalWindow.style.zIndex = ModalWindow.CURRENT_Z_INDEX;
        } else {
            if(ModalWindow.CURRENT_Z_INDEX > 10) {
                ModalWindow.CURRENT_Z_INDEX--;
            }
            modalWindow.style.zIndex = null;
        }
    }

}
export { ModalWindow };
