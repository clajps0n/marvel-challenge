import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MarvelAPI } from '../persistence/marvel.api';
import { FavouritesState } from '../persistence/redux/favourites.reducer';

import { FavouriteService } from './favourite.service';

describe('FavouriteService', () => {
  let service: FavouriteService;

  beforeEach(() => {
    let marvelApi = jasmine.createSpyObj('http', ['get'])
    let store = jasmine.createSpyObj<Store<FavouritesState>>('store', ['dispatch'])
    TestBed.configureTestingModule({
      providers: [
        { provide: MarvelAPI, useValue: marvelApi },
        { provide: Store, useValue: store }
      ]
    });
    service = TestBed.inject(FavouriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
