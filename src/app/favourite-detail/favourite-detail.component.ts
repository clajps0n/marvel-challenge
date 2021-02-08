import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../models/comic.model';

@Component({
  selector: 'app-favourite-detail',
  templateUrl: './favourite-detail.component.html',
  styleUrls: ['./favourite-detail.component.sass']
})
export class FavouriteDetailComponent implements OnInit {
  @Input() comic: Comic

  constructor() { }

  ngOnInit(): void {
  }

}
