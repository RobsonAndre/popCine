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
    console.log('FilmesProvider Ok');
  }
  
  //mostra a lista de filmes
  listarFilmes(page = 1, tipo, idioma = "pt-BR" ){
    //console.log(page, tipo, idioma);
    /**/
    if(tipo=='populares'){
      //console.log(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=${idioma}`);
      //return this.http.get(this.baseApiPath+`movie/popular?page=${page}&api_key=${this.apiKey()}&language=${idioma}`);
      return this.http.get(this.baseApiPath + `discover/movie?api_key=${this.apiKey()}&language=${idioma}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
    }else if(tipo == 'top_rated'){
      return this.http.get(this.baseApiPath+`movie/top_rated?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
      //return this.http.get(this.baseApiPath + `discover/movie?api_key=${this.apiKey()}&language=${idioma}&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page}`);
    }else if(tipo == 'now_playing'){
      return this.http.get(this.baseApiPath+`movie/now_playing?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
    }else if(tipo == 'upcoming'){
      return this.http.get(this.baseApiPath+`movie/upcoming?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
    }
  }
  
  //mostra a lista de filmes lancamentos
  listarLancamentos(page = 1, tipo = "lancamentos", idioma = "pt-BR" ){
    return this.http.get(this.baseApiPath+`movie/upcoming?page=${page}&api_key=${this.apiKey()}&language=${idioma}&region=BR`);
  }
  
  //mostra o filme
  pegarFilme(idFilme, idioma="pt-BR"){
    //return this.http.get(this.baseApiPath+`movie/${idFilme}?api_key=${this.apiKey()}&language=pt-BR`)
    //console.log(this.baseApiPath+`movie/${idFilme}?api_key=${this.apiKey()}&language=${idioma}&append_to_response=videos,credits,similar`)
    return this.http.get(this.baseApiPath+`movie/${idFilme}?api_key=${this.apiKey()}&language=${idioma}&append_to_response=videos,credits,similar`)
    /** /
    https://api.themoviedb.org/3/movie/78?api_key=89bf0c312ef8f45179405c81630581c5&language=pt-BR&append_to_response=keywords,alternative_titles,changes,credits,keywords,lists,releases,similar,translations
    /**/

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

  pegarPessoa(idPessoa, idioma="pt-BR"){
    return this.http.get(this.baseApiPath + `person/${idPessoa}?api_key=${this.apiKey()}&language=${idioma}&append_to_response=credits,images`);
  }


  pesquisarFilme(chave, page = 1){
  
    return this.http.get(this.baseApiPath + `search/movie?api_key=${this.apiKey()}&language=pt-BR&append_to_response=credits,images&page=${page}&include_adult=false&sort_by=release_date.desc&query=${chave}`);
  
    //https://api.themoviedb.org/3/search/movie?api_key=89bf0c312ef8f45179405c81630581c5&language=pt-BR&append_to_response=credits,images&query=batm
  }

  listarFilmePorGenero(genero, page = 1){
  
    return this.http.get(this.baseApiPath + `genre/${genero}/movies?api_key=${this.apiKey()}&language=pt-BR&include_adult=false&page=${page}&sort_by=created_at.desc`);
  
    //https://api.themoviedb.org/3/genre/27/movies?api_key=89bf0c312ef8f45179405c81630581c5&language=pt-BR&include_adult=false&sort_by=created_at.asc
  }

  listarGeneros(){
    let generos = [
      {"id": 12,    "name": "Aventura"},
      {"id": 14,    "name": "Fantasia"},
      {"id": 16,    "name": "Animação"},
      {"id": 18,    "name": "Drama"},
      {"id": 27,    "name": "Terror"},
      {"id": 28,    "name": "Ação"},
      {"id": 35,    "name": "Comédia"},
      {"id": 36,    "name": "História"},
      {"id": 37,    "name": "Faroeste"},
      {"id": 53,    "name": "Thriller"},
      {"id": 80,    "name": "Crime"},
      {"id": 99,    "name": "Documentário"},
      {"id": 878,   "name": "Ficção científica"},
      {"id": 9648,  "name": "Mistério"},
      {"id": 10402, "name": "Música"},
      {"id": 10749, "name": "Romance"},
      {"id": 10752, "name": "Guerra"},
      {"id": 10751, "name": "Família"},
      {"id": 10770, "name": "Cinema TV"}
    ];
    return generos;
  }

  pegaGenero(idGenero){
    let generos = this.listarGeneros();
    for(let i = 0; i<generos.length;i++){
      if(generos[i].id==idGenero){
        return generos[i].name;
      }else{
        console.log(generos[i].name);
      }
    }
    return "indefinido";
  }

  pegarOutrosVideos(idFilme){
    return this.http.get(this.baseApiPath + `movie/${idFilme}/videos?api_key=${this.apiKey()}`);
  }

  pegarColecao(idColecao){
    return this.http.get(this.baseApiPath + `collection/${idColecao}?api_key=${this.apiKey()}&language=pt-BR`)
  }

  private apiKey():string{
    return "89bf0c312ef8f45179405c81630581c5";
  }
}