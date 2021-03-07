import {WDKResponse, WDKResponseStatus} from "../common/types";

const handleRulerRequest = function(): WDKResponse {
    return {
        status: WDKResponseStatus.SUCCESS
    }
}

export default handleRulerRequest;