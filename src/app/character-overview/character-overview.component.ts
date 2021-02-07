import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {
  @Input() character: Character

  constructor(public dialog: MatDialog) {}

  openDetailDialog() {
    const dialogRef = this.dialog.open(CharacterDetailComponent, {
      data: this.character
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openComicDialog(comicId: number) {
    const dialogRef = this.dialog.open(ComicDetailComponent, {
      data: comicId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
