import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { Character } from 'src/app/models/character.model';
import { MarvelAPI } from 'src/app/persistence/marvel.api';
import { CharacterState } from 'src/app/persistence/redux/character.reducer';
import { CharacterService } from 'src/app/services/character.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { CharacterOverviewComponent } from './character-overview.component';
import { HttpClient } from '@angular/common/http';

describe('CharacterOverviewComponent', () => {
  let component: CharacterOverviewComponent;
  let fixture: ComponentFixture<CharacterOverviewComponent>;

  let store: Store;
  let marvelApi: MarvelAPI;
  let service: CharacterService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    marvelApi = TestBed.inject(MarvelAPI)
    httpMock = TestBed.inject(HttpTestingController)

    store = jasmine.createSpyObj<Store<CharacterState>>('store', ['dispatch'])
    service = jasmine.createSpyObj<CharacterService>('service', ['dispatchCharacterList', 'getDispatchedCharacterList'])

    await TestBed.configureTestingModule({
      declarations: [ CharacterOverviewComponent ],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [
        HttpClient,
        { provide: MarvelAPI, useValue: marvelApi },
        { provide: Store, useValue: store },
        { provide: CharacterService, useValue: service }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('#getObservableValue should return value from observable', (done: DoneFn) => {
  //   //let obs = from([<Character>{}])
  //   let x :ArrayLike<Character>
  //   service.getDispatchedCharacterList().subscribe(value => {
  //     expect(value).toBe(x);
  //     done();
  //   });
  // });
});
