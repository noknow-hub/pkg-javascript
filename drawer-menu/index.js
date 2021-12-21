//////////////////////////////////////////////////////////////////////
// index.js
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class DrawerMenu {

    static ACTIVE_CLASS_NAME = 'active';
    static DATE_DRAWER_MENU_ID = 'data-nkw-drawer-menu-id';
    static DATE_DRAWER_MENU_ID_VAL = 'nkwDrawerMenuId';
    static DATE_DRAWER_MENU_TARGET = 'data-nkw-drawer-menu-target';
    static DATE_DRAWER_MENU_TARGET_VAL = 'nkwDrawerMenuTarget';

    //////////////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////////////
    static Run() {
        const targetElms = document.querySelectorAll('[' + DrawerMenu.DATE_DRAWER_MENU_TARGET + ']');
        if(targetElms === undefined || targetElms === null || targetElms.length === 0) {
            return;
        }
        const idElms = document.querySelectorAll('[' + DrawerMenu.DATE_DRAWER_MENU_ID + ']');
        if(idElms === undefined || idElms === null || idElms.length === 0) {
            return;
        }
        for(let i = 0; i < targetElms.length; i++) {
            const targetElm = targetElms[i];
            if(targetElm.myAttached !== undefined && targetElm.myAttached !== null && targetElm.myAttached) {
                continue;
            }
            targetElm.myAttached = true;
            targetElm.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const targetVal = targetElm.dataset[DrawerMenu.DATE_DRAWER_MENU_TARGET_VAL];
                for(let j = 0; j < idElms.length; j++) {
                    const idElm = idElms[j];
                    const idVal = idElm.dataset[DrawerMenu.DATE_DRAWER_MENU_ID_VAL];
                    if(targetVal === idVal) {
                        idElm.classList.toggle(DrawerMenu.ACTIVE_CLASS_NAME);
                        break;
                    }
                }
            });
        }

        if(document.body.nkwDrawerMenuEventListener === undefined && document.body.nkwDrawerMenuEventListener === null || !document.body.nkwDrawerMenuEventListener) {
            document.body.nkwDrawerMenuEventListener = true;
            document.body.addEventListener('click', (event) => {
                for(let i = 0; i < idElms.length; i++) {
                    const elm = idElms[i];
                    if(elm.classList.contains(DrawerMenu.ACTIVE_CLASS_NAME)) {
                        let isInElm = false;
                        for(let e = event.target; e !== undefined && e !== null; e = e.parentElement) {
                            if(e === elm) {
                                isInElm = true;
                                break;
                            }
                        }
                        if(!isInElm) {
                            event.preventDefault();
                            event.stopPropagation();
                            elm.classList.toggle(DrawerMenu.ACTIVE_CLASS_NAME);
                        }
                    }
                }
            });
        }
    }

}
export { DrawerMenu };
