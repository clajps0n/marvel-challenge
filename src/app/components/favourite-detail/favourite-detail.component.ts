import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../../models/comic.model';
import { FavouriteService } from '../../services/favourite.service';

@Component({
  selector: 'app-favourite-detail',
  templateUrl: './favourite-detail.component.html',
  styleUrls: ['./favourite-detail.component.sass']
})
export class FavouriteDetailComponent implements OnInit {
  @Input() comic: Comic

  constructor(
    private favouriteService: FavouriteService
  ) { }

  ngOnInit(): void {
  }

  removeFromFavourites(comicId: number){
    this.favouriteService.removeDispatchedFavourite(comicId)
  }
}
