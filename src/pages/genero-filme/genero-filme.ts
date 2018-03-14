import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { FilmePage } from '../filme/filme';

/**
 * Generated class for the GeneroFilmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-genero-filme',
  templateUrl: 'genero-filme.html',
})
export class GeneroFilmePage {
  public filmes = new Array<any>(); // Lista de filmes
  public genero;
  public idGenero;
  public page = 1;
  public infiniteScroll;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public filmeProvider: FilmesProvider,
    public utilProvider: UtilProvider
  ) {
  }

  public listaFilmesGenero(id, page, newpage){
    //console.log(id, page, newpage);
    this.utilProvider.abreLoading();
    this.filmeProvider.listarFilmePorGenero(id,page).subscribe(
      data=>{
        const dt = (data as any);
        const obj = JSON.parse(dt._body);
        if(newpage){
          this.filmes = this.filmes.concat(obj.results);
          this.infiniteScroll.complete();
        }else{
          this.filmes = obj.results
        }
        this.utilProvider.fechaLoading();
      }, error=>{
        this.utilProvider.fechaLoading();
        console.log('err: '+ error);
      }
    );
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
  }



  public filmeAno(str){
    return str.substr(0,4);
  }

  public doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.listaFilmesGenero(this.idGenero,this.page,true);
  }

  ionViewDidEnter() {
    this.idGenero = this.navParams.get('id');
    this.genero = this.navParams.get('name');
    this.listaFilmesGenero(this.idGenero, this.page, false);
    /** /
    console.log(this.idGenero);
    console.log(this.genero);
    console.log('ionViewDidLoad GeneroFilmePage');
    /**/
  }
}
