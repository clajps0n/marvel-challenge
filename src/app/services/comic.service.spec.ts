import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MarvelAPI } from '../persistence/marvel.api';
import { ComicState } from '../persistence/redux/comic.reducer';

import { ComicService } from './comic.service';

describe('ComicService', () => {
  let service: ComicService;

  beforeEach(() => {
    let marvelApi = jasmine.createSpyObj('http', ['get'])
    let store = jasmine.createSpyObj<Store<ComicState>>('store', ['dispatch'])
    TestBed.configureTestingModule({
      providers: [
        { provide: MarvelAPI, useValue: marvelApi },
        { provide: Store, useValue: store }
      ]
    });
    service = TestBed.inject(ComicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
