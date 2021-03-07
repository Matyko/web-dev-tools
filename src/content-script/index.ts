import {WDKRequest, WDKRequestAction} from "../common/types";

chrome.runtime.onMessage.addListener(((message: WDKRequest, sender, sendResponse) => {
    switch (message.action) {
        case WDKRequestAction.RULER_ADD:
            console.log("addRuler");
            break;
        case WDKRequestAction.RULER_REMOVE:
            console.log("removeRuler");
            break;
        case WDKRequestAction.RULER_MODIFY:
            console.log("modifyRuler");
            break;
        default:
            console.log("default");
            break;
    }
}))