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
  listarFilmes(page = 1, tipo = "populares", idioma = "pt-BR" ){
    console.log(page, tipo, idioma);
    /**/
    if(tipo=='populares'){
      return this.http.get(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=${idioma}`);
    }else if(tipo == 'top_rated'){
      return this.http.get(this.baseApiPath+`movie/top_rated?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
    }else if(tipo == 'now_playing'){
      return this.http.get(this.baseApiPath+`movie/now_playing?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
    }
    /**/
    //return this.http.get(this.baseApiPath+`discover/movie?page=${page}&api_key=${this.apiKey()}&language=${idioma}&certification=R&sort_by=vote_average.desc`);
    //return this.http.get(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=${idioma}`);
    //return this.httpClient.get(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=pt-BR`);
  }
  
  //mostra a lista de filmes lancamentos
  listarLancamentos(page = 1, tipo = "lancamentos", idioma = "pt-BR" ){
    return this.http.get(this.baseApiPath+`movie/upcoming?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
  }
  
  //mostra o filme
  pegarFilme(idFilme, idioma="pt-BR"){
    //return this.http.get(this.baseApiPath+`movie/${idFilme}?api_key=${this.apiKey()}&language=pt-BR`)
    return this.http.get(this.baseApiPath+`movie/${idFilme}?api_key=${this.apiKey()}&language=${idioma}&append_to_response=videos,credits`)
  }

  pegarFilmesSemelhantes(page = 1, idFilme, idioma="pt-BR"){
    return this.http.get(this.baseApiPath+`movie/${idFilme}/similar?api_key=${this.apiKey()}&language=${idioma}&page=${page}`);
  }

  pegarVideos(idFilme, idioma="pt-BR"){
    //console.log("pegarVideos")
    return this.http.get(this.baseApiPath+`movie/${idFilme}/videos?api_key=${this.apiKey()}&language=${idioma}`);
  }

  //Creditos
  pegarCreditos(idFilme, idioma="pt-BR"){
    //console.log("Mostra Filme");
    return this.http.get(this.baseApiPath+ `movie/${idFilme}/credits?api_key=${this.apiKey()}&language=${idioma}`)
  }

  private apiKey():string{
    return "89bf0c312ef8f45179405c81630581c5";
  }

}