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

  constructor(
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
    this.favouriteList = this.marvelService.getDispatchedFavourites()
  }

}
