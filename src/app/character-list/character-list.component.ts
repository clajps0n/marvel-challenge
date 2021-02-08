import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Character } from '../models/character.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit, DoCheck {
  fullCharacterList: Array<Character>
  currentCharacterList: Array<Character>

  listLength = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  oldPageIndex: number
  oldPageSize: number

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.marvelService.getCharacterList().subscribe((res) => {
      this.fullCharacterList = res.data.results.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description || 'Without description',
          image: e.thumbnail.path+'.'+e.thumbnail.extension,
          series: e.series.items.length,
          stories: e.stories.items.length,
          comics: e.comics.items.map((c) => {
            let uriArr = c.resourceURI.split('/')
            return {
              id: uriArr[uriArr.length - 1],
              title: c.name
            }
          }),
        }
      })
      
      this.listLength = this.fullCharacterList.length
      this.oldPageIndex = 0

      this.currentCharacterList = this.fullCharacterList.slice(0,this.pageSize)

      console.log(this.currentCharacterList)
    })
  }

  ngDoCheck() {
    if(this.pageEvent && this.oldPageIndex != this.pageEvent.pageIndex){
      this.currentCharacterList = this.fullCharacterList.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize)
      this.oldPageIndex = this.pageEvent.pageIndex
    }

    if(this.pageEvent && this.pageEvent.pageSize != this.oldPageSize){
      this.currentCharacterList = this.fullCharacterList.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize)
      this.oldPageSize = this.pageEvent.pageSize
    }
  }
}
