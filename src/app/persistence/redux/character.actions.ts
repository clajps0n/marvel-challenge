import { Action } from "@ngrx/store";
import { Character } from "../../models/character.model";

export enum actionTypes {
    SET_CHARACTER_LIST = '[Comic] Set characters',
    GET_CHARACTER_LIST = '[Comic] Remove characters'
}

export class SetCharacterList implements Action {
    readonly type = actionTypes.SET_CHARACTER_LIST
    constructor(public payload: Character[]){}
}

export class GetCharacterList implements Action {
    readonly type = actionTypes.GET_CHARACTER_LIST
}

export type CharacterAction = SetCharacterList | GetCharacterList