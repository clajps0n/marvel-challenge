import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Comic } from '../../models/comic.model';
import { ComicService } from '../../services/comic.service';
import { FavouriteService } from '../../services/favourite.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.sass']
})
export class ComicDetailComponent implements OnInit, OnDestroy {
  comic: Observable<Comic>
  favs: Comic[]
  isFavourite: boolean
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public comicId: number,
    private comicService: ComicService,
    private favouriteService: FavouriteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.comic = this.comicService.getDispatchedComic()
    this.favs = JSON.parse(localStorage.getItem('favourites'))
    this.favouriteService.getDispatchedFavourites()
    .pipe(map(e => e.map(x => x.id)),filter(e => e.includes(Number(this.comicId))))
    .subscribe(ids => this.isFavourite = ids.includes(Number(this.comicId)))
  }

  addFavouriteComic(comic: Comic){
    this.favouriteService.dispatchFavouriteComic(comic)
    this.dialog.open(InfoDialogComponent, { data: 'The comic has been added to favourites successfully!'})
  }

  ngOnDestroy(): void {
    this.comicService.removeDispatchedComic()
  }
}
