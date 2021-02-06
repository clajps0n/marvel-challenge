import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {
  @Input() character: Character

  constructor() { }

  ngOnInit(): void {
  }

}
