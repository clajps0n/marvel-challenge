import { ActionReducerMap } from "@ngrx/store";
import { ComicState, comicReducer } from "./redux/comic.reducer";

export interface AppState {
    comic: ComicState
}

export const appReducer: ActionReducerMap<AppState> = {
    comic: comicReducer
}