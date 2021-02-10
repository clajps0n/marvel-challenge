import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment }  from '../../environments/environment'

@Injectable()
export class MarvelAPI {
  private auth = `&apikey=${environment.marvelApikey}&hash=${environment.marvelHash}`

  constructor(
    private http: HttpClient
  ) { }

  getCharacterListByName(nameStartsWith: string): Observable<any>{
    let url = `${environment.marvelURLBase}/characters?ts=1${this.auth}`
    if (nameStartsWith) {
      return this.http.get(`${url}&nameStartsWith=${nameStartsWith}`)
    }
    return this.http.get(url)
  }

  getComicById(comicId: number): Observable<any>{
    let url = `${environment.marvelURLBase}/comics/${comicId}?ts=1${this.auth}`
    return this.http.get(url)
  }
}