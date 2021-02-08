import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Comic } from "../models/comic.model";
import * as comicActions from './comic.actions'

export interface ComicState {
    currentComic: Comic
}

const initState: ComicState = {
    currentComic: <Comic> {
        id: null,
        title: null,
        description: null,
        image: null,
        price: null
    }
}

export function comicReducer(state: ComicState = initState, action: comicActions.ComicAction) {
    switch (action.type) {
        case comicActions.actionTypes.SET_CURRENT_COMIC:
            return {
                ...state,
                currentComic: action.payload
            }
        case comicActions.actionTypes.REM_CURRENT_COMIC:
            return initState
        default:
            return state
    }
}

const getComicStateFeature = createFeatureSelector<ComicState>('comic')
const getComicState = (state: ComicState) => state.currentComic
export const getComicStateSelector = createSelector(getComicStateFeature, getComicState)