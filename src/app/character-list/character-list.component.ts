import { AfterContentInit, Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character.model';
import { Comic } from '../models/comic.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit, AfterContentInit, DoCheck {
  fullCharacterList: Observable<Array<Character>>
  currentCharacterList: Array<Character>

  comicIds: Array<number>
  listLength = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  oldPageIndex: number
  oldPageSize: number

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.marvelService.dispatchCharacterList('')

    this.fullCharacterList = this.marvelService.getDispatchedCharacterList('')

    this.fullCharacterList.subscribe(list => {
      this.listLength = list.length
      this.currentCharacterList = list.slice(0, this.pageSize)
    })

    this.oldPageIndex = 0
  }

  ngAfterContentInit(){
    this.fullCharacterList
    .pipe(
      map(x => x.map(character => character.comics.map(comic => comic.id)))
    ).subscribe(arr => {
      this.comicIds = arr.reduce((acc, curr) => acc.concat(curr),[])
    })
  }

  onGenerateRandomFavs(){
    let randomIds = []
    randomIds.push(this.comicIds[Math.floor(Math.random() * this.comicIds.length)])
    randomIds.push(this.comicIds[Math.floor(Math.random() * this.comicIds.length)])
    randomIds.push(this.comicIds[Math.floor(Math.random() * this.comicIds.length)])
    
    randomIds.forEach(id => {
      if (id) {
        this.marvelService.dispatchComicById(id)
        this.marvelService.getDispatchedComic().subscribe(comic => {
          if (comic.id) {
            this.marvelService.dispatchFavouriteComic(comic)
          }
        })
      }
    })
  }

  ngDoCheck() {
    if (this.pageEvent && this.oldPageIndex != this.pageEvent.pageIndex) {
      this.fullCharacterList.subscribe(list => {
        this.currentCharacterList = list.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize)
        this.oldPageIndex = this.pageEvent.pageIndex
      })

    }

    if (this.pageEvent && this.pageEvent.pageSize != this.oldPageSize) {
      this.fullCharacterList.subscribe(list => {
        this.currentCharacterList = list.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize)
        this.oldPageSize = this.pageEvent.pageSize
      })
    }
  }
}
