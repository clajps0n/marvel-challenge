import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RemoveCurrenComic, SetCurrenComic } from '../redux/comic.actions';
import { Comic } from '../models/comic.model';
import * as fromCharacter from '../redux/character.reducer'
import * as fromComic from '../redux/comic.reducer'
import * as fromFavourites from '../redux/favourites.reducer'
import { AddFavouriteComic, RemoveFavouriteComic } from '../redux/favourites.actions';
import { filter, isEmpty, map } from 'rxjs/operators';
import { SetCharacterList } from '../redux/character.actions';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  favsChange = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private urlBase = 'http://gateway.marvel.com/v1/public'
  
  private urlAuth = {
    ts: 1,
    apikey: 'ba12ffa459a4fb2e5ab1b97885d7b367',
    hash: 'dd7d9f6b26d99faeac641ed115b71c16'
  }

  private auth = `?ts=${this.urlAuth.ts}&apikey=${this.urlAuth.apikey}&hash=${this.urlAuth.hash}`
  
  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  dispatchCharacterList(nameStartsWith: string): void{
    this.http.get(`${this.urlBase}/characters${this.auth}${nameStartsWith}`).subscribe((res: any) => {
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

  getDispatchedCharacterList(nameStartsWith: string): Observable<Character[]>{
    return this.store.select(fromCharacter.getCharacterStateSelector)
  }


  getComicList(comicId: number): Observable<any>{
    return this.http.get(`${this.urlBase}/comics/${comicId}${this.auth}`)
  }

  dispatchComicById(comicId: number): void{
    this.http.get(`${this.urlBase}/comics/${comicId}${this.auth}`).subscribe((res: any) => {
      let comic = <Comic>{
        id: res.data.results[0].id,
        title: res.data.results[0].title,
        description: res.data.results[0].description || 'Without description',
        image: res.data.results[0].thumbnail.path+'.'+res.data.results[0].thumbnail.extension,
        price: res.data.results[0].prices[0].price
      }
      this.store.dispatch(new SetCurrenComic(comic))
    })
  }

  getDispatchedComic(): Observable<Comic> {
    return this.store.select(fromComic.getComicStateSelector)
  }

  removeDispatchedComic(): void {
    this.store.dispatch(new RemoveCurrenComic())
  }

  dispatchFavouriteComic(comic: Comic): void {
    this.favsChange.next(true)
    this.store.dispatch(new AddFavouriteComic(comic))
  }

  getDispatchedFavourites(): Observable<Array<Comic>> {
    return this.store.select(fromFavourites.getFavouritesStateSelector)
  }

  getIfComicInFavourites(comicId: number): Observable<Comic[]> {
    return this.store.select(fromFavourites.getFavouritesStateSelector)
  }

  removeDispatchedFavourite(comicId: number): void {
    this.store.dispatch(new RemoveFavouriteComic(comicId))
  }

  searchCharacterByName(name: string) : void{
    this.dispatchCharacterList(`&nameStartsWith=${name}`)
  }
}
