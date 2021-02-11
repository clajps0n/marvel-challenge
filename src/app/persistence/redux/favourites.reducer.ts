import { createFeatureSelector, createSelector } from "@ngrx/store";
import { addToFavourites, removeFromFavourites } from "../local-storage";
import { Comic } from "../../models/comic.model";
import * as favourites from './favourites.actions'

export interface FavouritesState {
    favouriteList: Array<Comic>
}

const initState: FavouritesState = {
    favouriteList: new Array<Comic>()
}

export function favouritesReducer(state: FavouritesState = initState, action: favourites.FavouritesAction) {
    switch (action.type) {
        case favourites.actionTypes.ADD_FAVOURITE_COMIC:
            return {
                ...state,
                favouriteList: addToFavourites(state.favouriteList, action.payload)
            }
        case favourites.actionTypes.REM_FAVOURITE_COMIC:
            return {
                ...state,
                favouriteList: removeFromFavourites(state.favouriteList, action.payload)
            }
        default:
            return state
    }
}

const getFavouritesStateFeature = createFeatureSelector<FavouritesState>('favs')
const getFavouritesState = (state: FavouritesState) => state.favouriteList
export const getFavouritesStateSelector = createSelector(getFavouritesStateFeature, getFavouritesState)