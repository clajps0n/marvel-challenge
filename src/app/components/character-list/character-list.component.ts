import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { ComicService } from '../../services/comic.service';
import { FavouriteService } from '../../services/favourite.service';

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

  constructor(
    private characterService: CharacterService,
    private comicService: ComicService,
    private favouriteService: FavouriteService
    ) { }

  ngOnInit(): void {
    this.characterService.dispatchCharacterList('')

    this.fullCharacterList = this.characterService.getDispatchedCharacterList()

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
        this.comicService.dispatchComicById(id)
        this.comicService.getDispatchedComic().subscribe(comic => {
          if (comic.id) {
            this.favouriteService.dispatchFavouriteComic(comic)
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
