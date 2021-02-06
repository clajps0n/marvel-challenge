import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit {
  public characterList: Array<Character>

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.marvelService.getCharacterList().subscribe((res) => {
      this.characterList = res.data.results.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          image: e.thumbnail.path+'.'+e.thumbnail.extension
        }
      })
      console.log(this.characterList)
    })
  }

}
