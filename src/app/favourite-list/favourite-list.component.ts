import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.sass']
})
export class FavouriteListComponent implements OnInit {
  favouriteList: Observable<Array<Comic>>
  favs: Comic[]

  constructor(
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
    this.favs = JSON.parse(localStorage.getItem('favourites'))
    this.favs.forEach((comic: Comic) => {
      this.marvelService.dispatchFavouriteComic(comic)
    })
    this.favouriteList = this.marvelService.getDispatchedFavourites()
  }

}
