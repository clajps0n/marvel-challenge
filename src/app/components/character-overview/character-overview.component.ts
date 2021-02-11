import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';
import { Character } from '../../models/character.model';
import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {
  @Input() character: Character
  showComics: boolean

  constructor(
    private comicService: ComicService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.showComics = false
  }

  toggleShowComics() {
    this.showComics = !this.showComics
  }

  openComicDialog(comicId: number) {
    this.comicService.dispatchComicById(comicId)
    const dialogRef = this.dialog.open(ComicDetailComponent, {
      data: comicId
    });
  }
}
