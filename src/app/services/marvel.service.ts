import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private urlBase = 'http://gateway.marvel.com/v1/public'
  
  private nameStartsWith = 'Black Widow'
  private urlAuth = {
    ts: 1,
    apikey: 'ba12ffa459a4fb2e5ab1b97885d7b367',
    hash: 'dd7d9f6b26d99faeac641ed115b71c16'
  }

  private auth = `?ts=${this.urlAuth.ts}&apikey=${this.urlAuth.apikey}&hash=${this.urlAuth.hash}`
  
  constructor(private http: HttpClient) { }

  getCharacterList(): Observable<any>{
    return this.http.get(`${this.urlBase}/characters${this.auth}&nameStartsWith=${this.nameStartsWith}`)
  }

  getComicList(comicId: number): Observable<any>{
    return this.http.get(`${this.urlBase}/comics/${comicId}${this.auth}`)
  }
}
