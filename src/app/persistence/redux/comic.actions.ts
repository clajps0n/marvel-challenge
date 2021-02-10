import { Action } from "@ngrx/store";
import { Comic } from "../../models/comic.model";

export enum actionTypes {
    SET_CURRENT_COMIC = '[Comic] Set current comic',
    REM_CURRENT_COMIC = '[Comic] Remove current comic'
}

export class SetCurrenComic implements Action {
    readonly type = actionTypes.SET_CURRENT_COMIC
    constructor(public payload: Comic){}
}

export class RemoveCurrenComic implements Action {
    readonly type = actionTypes.REM_CURRENT_COMIC
}

export type ComicAction = SetCurrenComic | RemoveCurrenComic