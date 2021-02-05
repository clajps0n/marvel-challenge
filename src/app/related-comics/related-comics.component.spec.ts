import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedComicsComponent } from './related-comics.component';

describe('RelatedComicsComponent', () => {
  let component: RelatedComicsComponent;
  let fixture: ComponentFixture<RelatedComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedComicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
