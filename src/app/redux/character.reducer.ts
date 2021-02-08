import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Character } from "../models/character.model";
import * as character from './character.actions'

export interface CharacterState {
    characterList: Character[]
}

const initState: CharacterState = {
    characterList: []
}

export function characterReducer(state: CharacterState = initState, action: character.CharacterAction) {
    switch (action.type) {
        case character.actionTypes.SET_CHARACTER_LIST:
            return {
                ...state,
                characterList: action.payload
            }
        case character.actionTypes.GET_CHARACTER_LIST:
            return state
        default:
            return state
    }
}

const getCharacterStateFeature = createFeatureSelector<CharacterState>('chctrs')
const getCharacterState = (state: CharacterState) => state.characterList
export const getCharacterStateSelector = createSelector(getCharacterStateFeature, getCharacterState)