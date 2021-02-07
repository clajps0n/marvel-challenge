import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comic } from '../models/comic.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.sass']
})
export class ComicDetailComponent implements OnInit {
  comic: Comic

  constructor(
    @Inject(MAT_DIALOG_DATA) public comicId: number,
    private marvelService: MarvelService
  )
  { }

  ngOnInit(): void {
    this.marvelService.getComicList(this.comicId).subscribe((res) => {
      this.comic = <Comic>{
        id: res.data.results[0].id,
        title: res.data.results[0].title,
        description: res.data.results[0].description,
        image: res.data.results[0].thumbnail.path+'.'+res.data.results[0].thumbnail.extension,
        price: res.data.results[0].prices[0].price
      }
    })
  }

}
