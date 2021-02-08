import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../models/comic.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-favourite-detail',
  templateUrl: './favourite-detail.component.html',
  styleUrls: ['./favourite-detail.component.sass']
})
export class FavouriteDetailComponent implements OnInit {
  @Input() comic: Comic

  constructor(
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
  }

  removeFromFavourites(comicId: number){
    this.marvelService.removeDispatchedFavourite(comicId)
  }
}
