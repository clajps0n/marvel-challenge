import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import * as fromCharacter from '../persistence/redux/character.reducer'
import { SetCharacterList } from '../persistence/redux/character.actions';
import { MarvelAPI } from '../persistence/marvel.api';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  
  constructor(
    private marvelApi: MarvelAPI,
    private store: Store
  ) { }

  dispatchCharacterList(nameStartsWith: string): void{
    this.marvelApi.getCharacterListByName(nameStartsWith).subscribe((res: any) => {
      let fullCharacterList = res.data.results.map((e: any) => {
        return <Character>{
          id: e.id,
          name: e.name,
          description: e.description || 'Without description',
          image: e.thumbnail.path+'.'+e.thumbnail.extension,
          comics: e.comics.items.map((comic: any) => {
            let uriArr = comic.resourceURI.split('/')
            return {
              id: uriArr[uriArr.length - 1],
              title: comic.name
            }
          }),
        }
      })
      this.store.dispatch(new SetCharacterList(fullCharacterList))
    })
  }

  getDispatchedCharacterList(): Observable<Character[]>{
    return this.store.select(fromCharacter.getCharacterStateSelector)
  }
}
