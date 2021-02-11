import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup){
    this.characterService.dispatchCharacterList(form.value.character)
    form.reset()
  }
}
