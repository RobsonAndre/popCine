import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, MenuController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { FilmePage } from '../filme/filme';
import { UtilProvider } from '../../providers/util/util';
import { FilmePopoverPage } from '../filme-popover/filme-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    FilmesProvider,
    UtilProvider
  ]
})
export class HomePage {

  public filmes = new Array<any>(); // Lista de filmes
  public refresher;
  public isRefreshing:boolean = false;
  public infiniteScroll;
  public page = 1;
  public tipo:string = 'populares';
  public opts;
  public mostraPopover: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController
  ) {

    this.opts = [
      { title: 'Em Exibição',         component: HomePage, tipo: 'now_playing' },
      { title: 'Filmes em Destaque',  component: HomePage, tipo: 'populares' },
      { title: 'Lançamentos',         component: HomePage, tipo: 'upcoming' },
      { title: 'Melhor Avaliados',    component: HomePage, tipo: 'top_rated' },
      /**/
    ];
  }
  
  abrePopover(){
    console.log("AbrePopover");
    if(this.mostraPopover){
      this.mostraPopover = false;
    }else{
      this.mostraPopover = true;
    }
  }

  fechaPopover(){
    console.log("FechaPopover");
    this.mostraPopover = false;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);
    this.navCtrl.push(page.component, { tipo: page.tipo });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(FilmePopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  public mascaraTipo(tipo){
    if(tipo == 'populares'){
      return("Filmes em Destaque");
    } else if(tipo == 'top_rated'){
      return("Melhor Avaliados");
    } else if(tipo == 'now_playing'){
      return("Em Exibição");
    } else if(tipo == 'upcoming'){
      return("Proximos Lançamentos");
    }
    return tipo;
  }

  public doRefresh(refresher) {
    //console.log(refresher)
    this.refresher = refresher;
    this.isRefreshing = true;
    this.page = 1;
    this.carregarFilmes(false, this.tipo);
  }
  
  public doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true, this.tipo);
  }
  
  public filmeAno(str){
    return str.substr(0,4);
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
  }

  public carregarFilmes(newpage:boolean=false,tipo:string='populares'){ 
    this.utilProvider.abreLoading(); 
    this.filmesProvider.listarFilmes(this.page, tipo).subscribe(
      data=>{
        const resp = (data as any);
        const obj_resp = JSON.parse(resp._body);
        if(newpage){
          //Aqui a pagina foi recarregada
          this.filmes = this.filmes.concat(obj_resp.results);
          this.infiniteScroll.complete();
        }else{
          //A pagina foi carregada - primeiro load
          this.filmes = obj_resp.results;
          //console.log(this.filmes)
        }
        this.utilProvider.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },error=>{
        this.utilProvider.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
  }

  public ionViewDidLoad(){
    
    this.tipo = this.navParams.get("tipo") ? this.navParams.get("tipo") : 'now_playing' ;
    this.carregarFilmes(false, this.tipo);
    console.log("HomePage Ok");
  }

}