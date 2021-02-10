import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic.model';
import { AddFavouriteComic, RemoveFavouriteComic } from '../persistence/redux/favourites.actions';
import * as fromFavourites from '../persistence/redux/favourites.reducer'

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(
    private store: Store
  ) { }

  dispatchFavouriteComic(comic: Comic): void {
    this.store.dispatch(new AddFavouriteComic(comic))
  }

  getDispatchedFavourites(): Observable<Comic[]> {
    return this.store.select(fromFavourites.getFavouritesStateSelector)
  }

  getIfComicInFavourites(comicId: number): Observable<Comic[]> {
    return this.store.select(fromFavourites.getFavouritesStateSelector)
  }

  removeDispatchedFavourite(comicId: number): void {
    this.store.dispatch(new RemoveFavouriteComic(comicId))
  }
}
