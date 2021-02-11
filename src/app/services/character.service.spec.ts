import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Character } from '../models/character.model';
import { MarvelAPI } from '../persistence/marvel.api';
import { SetCharacterList } from '../persistence/redux/character.actions';
import { CharacterState } from '../persistence/redux/character.reducer';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;
  let store: Store;
  let marvelApi: MarvelAPI;

  beforeEach(() => {
    marvelApi = jasmine.createSpyObj('marvelApi', ['getCharacterListByName'])
    store = jasmine.createSpyObj<Store<CharacterState>>('store', ['dispatch'])
    
    TestBed.configureTestingModule({
      providers: [
        { provide: MarvelAPI, useValue: marvelApi },
        { provide: Store, useValue: store }
      ]
    });
    
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
