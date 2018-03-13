import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { FilmePage } from '../filme/filme';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the FilmePesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-pesquisa',
  templateUrl: 'filme-pesquisa.html',
})
export class FilmePesquisaPage {

  public filmes = new Array<any>(); // Lista de filmes
  public refresher;
  public isRefreshing:boolean = false;
  public infiniteScroll;
  public page = 1;
  public tipo:string = 'populares';
  public pesquisa:boolean = false;
  public rPesquisa:boolean = false;
  public chave:string = '';
  public pfilmes = new Array<any>(); // Lista de filmes pesquisados
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider
  ) {

  }
  
  public limpaPesquisa(){
    this.chave = "";
    this.pfilmes = [];
  }

  public fazPesquisa(page=1, newpage = false){
    if(this.chave.length>3){
      this.rPesquisa = true ;
      this.filmesProvider.pesquisarFilme(this.chave, page).subscribe(
        data =>{
          const dt = (data as any);
          const obj = JSON.parse(dt._body);
          if(newpage){
            this.pfilmes = this.pfilmes.concat(obj.results);
            this.infiniteScroll.complete();
          }else{
            this.pfilmes = obj.results
          }
          console.log(this.pfilmes); 
        }, error =>{
          console.log('err: '+ error);
        }
      );
    }else{
      this.pfilmes = [];
      this.rPesquisa = false ;
    }
  }

  public filmeAno(str){
    return str.substr(0,4);
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
  }

  public doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.fazPesquisa(this.page,true);
  }

  public ionViewDidEnter(){
    this.tipo = this.navParams.get("tipo") ? this.navParams.get("tipo") : 'populares' ;
  }
}
