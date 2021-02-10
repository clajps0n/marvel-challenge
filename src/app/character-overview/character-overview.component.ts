import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';
import { Character } from '../models/character.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {
  @Input() character: Character
  showComics: boolean

  constructor(
    private marvelService: MarvelService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.showComics = false
  }

  toggleShowComics() {
    this.showComics = !this.showComics
  }

  openComicDialog(comicId: number) {
    this.marvelService.dispatchComicById(comicId)
    const dialogRef = this.dialog.open(ComicDetailComponent, {
      data: comicId
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log(`Dialog closed`);
    });
  }
}
