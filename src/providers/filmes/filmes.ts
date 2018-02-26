import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the FilmesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilmesProvider {
 
  /** /
  //Construtor padrão
  constructor(public http: HttpClient) {
     console.log('Hello FilmesProvider Provider');
  }
  /**/

  //Path basico 
  private baseApiPath = "https://api.themoviedb.org/3/"; 
  constructor(
    public httpClient: HttpClient,
    public http: Http
    ) {
    console.log('Filme Provider');
  }
  //mostra a lista de filmes
  listarFilmes(page = 1){
    return this.http.get(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=pt-BR`);
    //return this.httpClient.get(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=pt-BR`);
  }
  //mostra o filme
  mostrarFilme(idFilme){
    return this.http.get(this.baseApiPath+`movie/${idFilme}?api_key=${this.apiKey()}&language=pt-BR&append_to_response=videos`)
  }

  private apiKey():string{
    return "89bf0c312ef8f45179405c81630581c5";
  }

}