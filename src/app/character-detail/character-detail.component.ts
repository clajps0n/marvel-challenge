import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.sass']
})
export class CharacterDetailComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public character: Character) { }

  ngOnInit(): void {
  }

}
