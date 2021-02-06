import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.sass']
})
export class CharacterListComponent implements OnInit {
  public characterList: Array<any>

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.marvelService.getCharacterList().subscribe((res) => {
      this.characterList = res.data.results
      console.log(this.characterList)
    })
  }

}
