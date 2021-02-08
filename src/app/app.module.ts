import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { RelatedComicsComponent } from './related-comics/related-comics.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { FavouriteDetailComponent } from './favourite-detail/favourite-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarvelService } from './services/marvel.service';
import { appReducer } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CharacterListComponent,
    CharacterOverviewComponent,
    RelatedComicsComponent,
    CharacterDetailComponent,
    ComicDetailComponent,
    FavouriteListComponent,
    FavouriteDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [
    MarvelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
