import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic.model';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.sass']
})
export class FavouriteListComponent implements OnInit {
  favouriteList: Observable<Array<Comic>>
  favs: Comic[]

  constructor(
    private favouriteService: FavouriteService
  ) { }

  ngOnInit(): void {
    this.favs = JSON.parse(localStorage.getItem('favourites'))
    this.favs.forEach((comic: Comic) => {
      this.favouriteService.dispatchFavouriteComic(comic)
    })
    this.favouriteList = this.favouriteService.getDispatchedFavourites()
  }

}
