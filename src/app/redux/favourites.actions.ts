import { Action } from "@ngrx/store";
import { Comic } from "../models/comic.model";

export enum actionTypes {
    ADD_FAVOURITE_COMIC = '[Favourites] Add favourite comic',
    REM_FAVOURITE_COMIC = '[Favourites] Remove favourite comic'
}

export class AddFavouriteComic implements Action {
    readonly type = actionTypes.ADD_FAVOURITE_COMIC
    constructor(public payload: Comic){}
}

export class RemoveFavouriteComic implements Action {
    readonly type = actionTypes.REM_FAVOURITE_COMIC
    constructor(public payload: number){}
}

export type FavouritesAction = AddFavouriteComic | RemoveFavouriteComic