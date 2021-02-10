import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Comic } from '../models/comic.model';
import { RemoveCurrenComic, SetCurrenComic } from '../persistence/redux/comic.actions';
import * as fromComic from '../persistence/redux/comic.reducer'
import { MarvelAPI } from '../persistence/marvel.api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  constructor(
    private marvelApi: MarvelAPI,
    private store: Store
  ) { }

  dispatchComicById(comicId: number): void{
    this.marvelApi.getComicById(comicId).subscribe((res: any) => {
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

}
