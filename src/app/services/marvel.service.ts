import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RemoveCurrenComic, SetCurrenComic } from '../redux/comic.actions';
import { Comic } from '../models/comic.model';
import * as fromComic from '../redux/comic.reducer'

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private urlBase = 'http://gateway.marvel.com/v1/public'
  
  private nameStartsWith = 'Black Widow'
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

  getCharacterList(): Observable<any>{
    return this.http.get(`${this.urlBase}/characters${this.auth}&nameStartsWith=${this.nameStartsWith}`)
  }

  getComicList(comicId: number): Observable<any>{
    return this.http.get(`${this.urlBase}/comics/${comicId}${this.auth}`)
  }

  dispatchComicById(comicId: number): void{
    this.http.get(`${this.urlBase}/comics/${comicId}${this.auth}`).subscribe((res: any) => {
      let comic = <Comic>{
        id: res.data.results[0].id,
        title: res.data.results[0].title,
        description: res.data.results[0].description,
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
}
