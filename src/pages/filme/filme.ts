import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { TrailerPage } from '../trailer/trailer';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

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
  public semelhantes = new Array<any>(); // Lista de filmes semelhantes
  //public creditos.crew[arrayIndice(creditos.crew,'Director')].name
  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    public youtubeVideoPlayer: YoutubeVideoPlayer
  ) {

  }
  /**/
  public openVideo(idVideo){
    this.youtubeVideoPlayer.openVideo(idVideo);
    console.log("openVideo: " + idVideo);
  }
  public abrePessoa(idPessoa){
    console.log('Pessoa: ' + idPessoa);
  }
  /**/

  /** /
  showToast(msg: string) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
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

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
    console.log(id);
  }

  public //pegando Indice do array a partir da propriedade
  arrayIndice(array, propriedade){
    for(let i=0;i<array.length;i++){
      if(array[i].job==propriedade){
        return i;
      }
    }  
    return -1;
  }
  
  ionViewDidEnter() {
    this.utilProvider.abreLoading();
    this.idFilme = this.navParams.get("id");
    //console.log('idFilme:'+this.idFilme);
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

    //pegandos os filmes semelhantes
    this.filmesProvider.pegarFilmesSemelhantes(1,this.idFilme).subscribe(data=>{
      console.log(data);
      let retorno = (data as any)._body;
      this.semelhantes = JSON.parse(retorno);
      console.log(this.semelhantes);
    },error=>{
      console.log(error);
    }) 


    //Pegando os detalhes do Filme
    this.filmesProvider.pegarFilme(this.idFilme).subscribe(data => {
      console.log('@@@'+data);
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