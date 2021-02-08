import { AfterContentInit, AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription, from, BehaviorSubject } from 'rxjs';
import { filter, map, isEmpty } from 'rxjs/operators';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Comic } from '../models/comic.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.sass']
})
export class ComicDetailComponent implements OnInit, OnDestroy {
  comic: Observable<Comic>
  favs: Comic[]
  //subs: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public comicId: number,
    private marvelService: MarvelService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.comic = this.marvelService.getDispatchedComic()
    /*this.subs = this.marvelService.getDispatchedFavourites().subscribe(arr => {
      this.favs = arr
    })*/
  }

  addFavouriteComic(comic: Comic){
    this.marvelService.dispatchFavouriteComic(comic)
    this.dialog.open(InfoDialogComponent, { data: 'The comic has been added to favourites successfully!'})
  }

  ngOnDestroy(): void {
    this.marvelService.removeDispatchedComic()
  }
}
