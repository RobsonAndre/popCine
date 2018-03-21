import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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

  @ViewChild(Content) content: Content;

  public start = 0;
  public threshold = 100;
  public slideHeaderPrevious = 0;
  public ionScroll: any;
  public showheader: boolean;
  public hideheader: boolean;
  public headercontent: any;

  public filmes = new Array<any>(); // Lista de filmes
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public page = 1;
  public tipo: string = 'populares';
  public pesquisa: boolean = false;
  public rPesquisa: boolean = false;
  public chave: string = '';
  public pfilmes = new Array<any>(); // Lista de filmes pesquisados

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    public renderer: Renderer,
    public myElement: ElementRef
  ) {
    this.showheader = false;
    this.hideheader = true;
  }

  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener("scroll", () => {
      if (this.ionScroll.scrollTop - this.start > this.threshold) {
        this.showheader = true;
        this.hideheader = false;
      } else {
        this.showheader = false;
        this.hideheader = true;
      }
      if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
        this.showheader = false;
        this.hideheader = true;
      }
      this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
    });
  }


  public limpaPesquisa() {
    this.chave = "";
    this.pfilmes = [];
    this.rPesquisa = false;
  }

  public reabrePesquisa(){
    this.rPesquisa = false;
  }

  public fazPesquisa(page = 1, newpage = false) {
    this.utilProvider.abreLoading();
    if (this.chave.length > 3) {
      //this.utilProvider.abreLoading(); 
      this.rPesquisa = true;
      this.filmesProvider.pesquisarFilme(this.chave, page).subscribe(
        data => {
          const dt = (data as any);
          const obj = JSON.parse(dt._body);
          if (newpage) {
            this.pfilmes = this.pfilmes.concat(obj.results);
            this.infiniteScroll.complete();
          } else {
            this.pfilmes = obj.results
          }
          //console.log(this.pfilmes); 
          this.utilProvider.fechaLoading();
        }, error => {
          this.utilProvider.fechaLoading();
          console.log('err: ' + error);
        }
      );
    } else {
      this.utilProvider.fechaLoading();
      this.pfilmes = [];
      this.rPesquisa = false;
      this.utilProvider.showToast("Digite 3 (três) ou mais caracteres!")
    }
  }

  public filmeAno(str) {
    return str.substr(0, 4);
  }

  public abreFilme(id) {
    this.navCtrl.push(FilmePage, { id: id });
  }

  public doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.fazPesquisa(this.page, true);
  }

  public ionViewDidEnter() {
    this.tipo = this.navParams.get("tipo") ? this.navParams.get("tipo") : 'populares';
  }
}
