import { ActionReducerMap } from "@ngrx/store";
import { ComicState, comicReducer } from "./redux/comic.reducer";
import { FavouritesState, favouritesReducer } from "./redux/favourites.reducer";

export interface AppState {
    comic: ComicState,
    favs: FavouritesState
}

export const appReducer: ActionReducerMap<AppState> = {
    comic: comicReducer,
    favs: favouritesReducer
}