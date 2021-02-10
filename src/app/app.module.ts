import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { RelatedComicsComponent } from './related-comics/related-comics.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { FavouriteDetailComponent } from './favourite-detail/favourite-detail.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

import { MarvelService } from './services/marvel.service';

import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CharacterListComponent,
    CharacterOverviewComponent,
    RelatedComicsComponent,
    ComicDetailComponent,
    FavouriteListComponent,
    FavouriteDetailComponent,
    InfoDialogComponent
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
