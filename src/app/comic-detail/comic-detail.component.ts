import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.sass']
})
export class ComicDetailComponent implements OnInit, OnDestroy {
  comic: Observable<Comic>
  loading: Observable<boolean>

  constructor(
    @Inject(MAT_DIALOG_DATA) public comicId: number,
    private marvelService: MarvelService
  )
  { }

  ngOnInit(): void {
    this.comic = this.marvelService.getDispatchedComic()
  }

  ngOnDestroy(): void {
    this.marvelService.removeDispatchedComic()
  }
}
