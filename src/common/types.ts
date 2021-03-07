export enum WDKRequestAction {
    RULER_ADD,
    RULER_REMOVE,
    RULER_MODIFY,
    CSS_INSPECT_ON,
    CSS_INSPECT_OFF,
    FONT_INSPECT_ON,
    FONT_INSPECT_OFF
}

export enum WDKResponseStatus {
    SUCCESS,
    ERROR,
    WARNING
}


export interface WDKRequest {
    action: WDKRequestAction,
    data?: any
}

export interface WDKResponse {
    status: WDKResponseStatus,
    message?: string,
    data?: object
}

export interface Ruler {
    id: number,
    position: RulerPosition,
    isViewed: boolean
}

export interface RulerPosition {
    x: number,
    y: number
}