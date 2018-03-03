import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { FilmePage } from '../filme/filme';
import { UtilProvider } from '../../providers/util/util';
/**
 * Generated class for the LancamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
  providers:[
    FilmesProvider,
    UtilProvider
  ]
})
export class LancamentosPage {
  public filmes = new Array<any>(); // Lista de filmes
  public refresher;
  public isRefreshing:boolean = false;
  public infiniteScroll;
  public page = 1;
  public tipo:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider
  ) {
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes(false, this.tipo);

  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true, this.tipo);
  }
  
  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
    console.log(id);
  }

  public mascaraData(str){
    return this.utilProvider.mascaraData(str);
  }
  carregarFilmes(newpage:boolean=false,tipo:string='lancamentos'){ 
    this.utilProvider.abreLoading(); 
    this.filmesProvider.listarLancamentos(this.page, tipo).subscribe(
      data=>{
        const resp = (data as any);
        const obj_resp = JSON.parse(resp._body);
        if(newpage){
          this.filmes = this.filmes.concat(obj_resp.results);
          this.infiniteScroll.complete();
        }else{
          this.filmes = obj_resp.results;
        }
        
        console.log(this.filmes); 
        this.utilProvider.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },error=>{
        console.log(error);
        this.utilProvider.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
    console.log("lancamentos.ts");
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidLoad LancamentosPage');
    this.tipo = this.navParams.get("tipo");
    console.log("---"+this.tipo+"---");
    this.carregarFilmes(false, this.tipo);
  }
}
