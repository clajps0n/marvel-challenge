import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private marvelService: MarvelService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup){
    this.marvelService.searchCharacterByName(form.value.character)
  }
}
