import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterOverviewComponent } from './components/character-overview/character-overview.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { FavouriteListComponent } from './components/favourite-list/favourite-list.component';
import { FavouriteDetailComponent } from './components/favourite-detail/favourite-detail.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';

import { MarvelAPI } from './persistence/marvel.api'
import { CharacterService } from './services/character.service';
import { ComicService } from './services/comic.service';
import { FavouriteService } from './services/favourite.service';

import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CharacterListComponent,
    CharacterOverviewComponent,
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
    MarvelAPI,
    CharacterService,
    ComicService,
    FavouriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
