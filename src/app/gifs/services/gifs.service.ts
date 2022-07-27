import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'VvW55sqCF11M0XrOYmrYHpz2cDeQthcg';
  private _historial: string[] = [];

  
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor ( private http: HttpClient ) {  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=VvW55sqCF11M0XrOYmrYHpz2cDeQthcg&q=${ query }&limit=10`)
      .subscribe( (response) => {
        console.log(response.data);
        this.resultados = response.data;
      })
  }

}
