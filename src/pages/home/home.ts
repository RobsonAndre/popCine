import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { FilmePage } from '../filme/filme';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    FilmesProvider
  ]
})
export class HomePage {

  public filmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing:boolean = false;
  public infiniteScroll;
  public page = 1;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider,
    public loadingCtrl: LoadingController
  ) {

  }
  
  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes(false);

  }
  
  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  abreLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  fechaLoading(){
    this.loader.dismiss();
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
    console.log(id);
  }

  carregarFilmes(newpage:boolean=false){ 
    this.abreLoading(); 
    this.filmesProvider.listarFilmes(this.page).subscribe(
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
        this.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },error=>{
        console.log(error);
        this.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
    console.log("home.ts");
  }

  ionViewDidEnter(){
    this.carregarFilmes(false);
  }

}
