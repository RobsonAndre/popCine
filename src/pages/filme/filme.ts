import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { TrailerPage } from '../trailer/trailer';

/**
 * Generated class for the FilmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme',
  templateUrl: 'filme.html',
  providers: [
    FilmesProvider,
    UtilProvider
  ]
})
export class FilmePage {

  public filme;
  public creditos;
  public idFilme;
  public castFilme;
  public videos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    private toastCtrl: ToastController
  ) {
  }
  /**/
  showToast(msg: string) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }
  /**/
  public abreTrailer(str) {
    this.navCtrl.push(TrailerPage, { str: str });
    console.log(str);
  }

  private montaCast(obj){
    /** /
    for(let i = 0; i<this.creditos.cast.length; i++){
      if()
    }
    /**/
    return true;
  }

  ionViewDidEnter() {
    this.utilProvider.abreLoading();
    this.idFilme = this.navParams.get("id");
    //console.log('idFilme:'+this.idFilme);
    /** /
    //Pegado os videos
    this.filmesProvider.pegarVideos(this.idFilme).subscribe(data=>{
      let vidRetorno = (data as any)._body;
      this.videos = JSON.parse(vidRetorno);
      console.log(this.videos);
    }, error =>{
      console.log("Error Cretitos: " + error);
    })
    /**/
    //Pegando os creditos do Filme
    this.filmesProvider.pegarCreditos(this.idFilme).subscribe(data=>{
      let credRetorno = (data as any)._body;
      this.creditos = JSON.parse(credRetorno);
      //console.log(this.creditos.cast[0].profile_path);
      console.log(this.creditos);
      this.castFilme = this.montaCast(this.creditos);
    }, error =>{
      console.log("Error Cretitos: " + error);
    })

    //Pegando os detalhes do Filme
    this.filmesProvider.pegarFilme(this.idFilme).subscribe(data => {
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
      console.log(this.filme);
      //Pegando a data de lancamento
      if (this.filme.release_date) {
        this.filme.lancamento = this.filme.release_date.substr(8,2)+"/"+this.filme.release_date.substr(5,2)+"/"+this.filme.release_date.substr(0,4);
      } else {
        this.filme.lancamento = "";
      }
      //Pegando o Genero
      if (this.filme.genres.length) {
        this.filme.genres = this.filme.genres[0].name;
      } else {
        this.filme.genres = "";
      }
      //Pegando a Linguagem
      if (this.filme.spoken_languages.length) {
        this.filme.languages = this.filme.spoken_languages[0].name;
      } else {
        this.filme.genres = "";
      }
      //Pegando o Trailer
      if (this.filme.videos.results.length) {
        this.filme.trailer = this.filme.videos.results[0].key;
      } else {
        this.filme.trailer = "";
      }
      //console.log(this.filme);
      this.utilProvider.fechaLoading();
    }, error => {
      console.log(error);
      this.utilProvider.fechaLoading();
    })
  }
}