import { ActionReducerMap } from "@ngrx/store";
import { ComicState, comicReducer } from "./redux/comic.reducer";
import { FavouritesState, favouritesReducer } from "./redux/favourites.reducer";
import { CharacterState, characterReducer } from "./redux/character.reducer";

export interface AppState {
    chctrs: CharacterState
    comic: ComicState,
    favs: FavouritesState
}

export const appReducer: ActionReducerMap<AppState> = {
    chctrs: characterReducer,
    comic: comicReducer,
    favs: favouritesReducer
}