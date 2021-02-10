import { ActionReducerMap } from "@ngrx/store";
import { ComicState, comicReducer } from "./persistence/redux/comic.reducer";
import { FavouritesState, favouritesReducer } from "./persistence/redux/favourites.reducer";
import { CharacterState, characterReducer } from "./persistence/redux/character.reducer";

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