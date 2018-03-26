import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { TrailerPage } from '../trailer/trailer';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { PessoaPage } from '../pessoa/pessoa';

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
  public videos;
  public semelhantes; // Lista de filmes semelhantes
  public filmeFavorito // int

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    public youtubeVideoPlayer: YoutubeVideoPlayer,
    public socialSharing: SocialSharing,
    public dbProvider: DatabaseProvider,
    public viewController: ViewController,
    public modalController: ModalController
  ) {

    this.creditos = {
      'crew': {}
    };
  
  }

  public pegarVideos(idFilme){
    this.filmesProvider.pegarOutrosVideos(idFilme).subscribe(data => {
      
      let res = (data as any)._body;
      let ret = JSON.parse(res);
      this.videos = ret.results;
    
    }, error => {
      
      console.log(error);
      //this.utilProvider.fechaLoading();
    })
  }

  public openModalVidoes(){
    if((this.filme.trailer && this.videos.length>0) || (!this.filme.trailer && this.videos.length>1)){
      let modalPage = this.modalController.create('ModalVideosPage',{'filme': this.filme.title, 'arr':this.videos}); 
      modalPage.present();
    }else{
      this.utilProvider.showToast("Não exitem outro vídeos disponível");
    }
  }

  /**/
  public openVideo(idVideo) {
    this.youtubeVideoPlayer.openVideo(idVideo);
  }

  /**/
  public compartilharFilme(filme) {
    let mensagem = {
      "msg": filme.title,
      "img": "https://image.tmdb.org/t/p/w500/" + filme.poster_path,
      "url": "http://www.papiroweb.com.br/",
      "sub": "PopCine"
    };
    //this.socialSharing.shareViaWhatsApp(mensagem.msg,mensagem.img,mensagem.url);
    this.socialSharing.share(mensagem.msg, mensagem.sub, mensagem.img);
  }
  
  /**/
  public abrePessoa(idPessoa) {
    this.navCtrl.push(PessoaPage, { 'id': idPessoa });
    //console.log('Pessoa: ' + idPessoa);
  }

  public abreFilme(id) {
    this.navCtrl.push(FilmePage, { id: id });
    //console.log("AbreFilme no Filme: " + id);
  }

  public abrePage(page, filme, arr) {
    this.navCtrl.push(page, { filme: filme, arr: arr });
    //console.log("AbreFilme no Filme: " + id);
  }


  //pegando Indice do array a partir da propriedade
  public arrayIndice(array, propriedade) {
    //return array.indexOf(propriedade); 
    /**/
    for (let i = 0; i < array.length; i++) {
      if (array[i].job == propriedade) {
        return i;
      }
    }
    return -1;
    /**/
  }

  //Verificando se o filme ja foi inserido na tabela filme_favoritos
  public verificaFavorito(idFilme) {

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "SELECT * FROM filmes_favoritos WHERE id_filme = ?";
        let data = [idFilme];
        return db.executeSql(sql, data)
          .then((data: any) => {
            this.filmeFavorito = data.rows.length;
          })
          .catch(e => {
            this.utilProvider.showToast("err: " + e);
          });
      })
      .catch(e => {
        this.utilProvider.showToast("err: " + e);
      });

  }

  // Abrindo a janela modal no arquivo local
  // ao abrir utilProvider nao é possivel ajusta a propriedade this.filmeFavorito
  public openModalPage(pageModal, arr) {
    //console.log("Open Modal: "+ pageModal);
    let modalPage = this.modalController.create(pageModal, { 'arr': arr });
    modalPage.onDidDismiss(data => {
      if (data) {
        this.filmeFavorito = data.qtde;
        //this.utilProvider.showToast('dismiss: ' + this.filmeFavorito);
      }
    })
    modalPage.present();
  }

  //Carrega ao entrar na pagina
  ionViewDidEnter() {
    //Abrindo o loading
    this.utilProvider.abreLoading();
    //pegando o filme
    this.idFilme = this.navParams.get("id");
    //console.log('idFilme:'+this.idFilme);
    
    //Pegando os outro videos
    this.pegarVideos(this.idFilme);

    //Pegando os creditos do Filme
    this.filmesProvider.pegarCreditos(this.idFilme).subscribe(data => {
      let credRetorno = (data as any)._body;
      this.creditos = JSON.parse(credRetorno);
      //console.log(this.creditos.cast[0].profile_path);
      //console.log(this.creditos);
    }, error => {
      console.log("Error Cretitos: " + error);
    })

    //Pegando os detalhes do Filme
    this.filmesProvider.pegarFilme(this.idFilme).subscribe(data => {
      //console.log(data);
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
      //console.log(this.filme);

      //Pegando a data de lancamento
      if (this.filme.release_date) {
        this.filme.lancamento = this.utilProvider.mascaraData(this.filme.release_date);
        //this.filme.lancamento = this.filme.release_date.substr(8,2)+"/"+this.filme.release_date.substr(5,2)+"/"+this.filme.release_date.substr(0,4);
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
        /** /
        let t = {
          key: this.filme.videos.results[0].key,
          title: "Trailer Oficial",
          type: "Trailer",
          site: "Youtube"
        } 
        this.filme.trailer.push(t);
        /**/
        this.filme.trailer = this.filme.videos.results[0].key;
      } else {
        this.filme.trailer = "";
      }

      

      //Pegando os filmes semelhantes
      if (this.filme.similar.results.length) {
        this.semelhantes = this.filme.similar.results;
        //console.log(this.semelhantes);
      } else {
        this.semelhantes = "";
      }

      //Verificando se o filme esta nos favoritos
      this.verificaFavorito(this.filme.id);
      //console.log(this.filme);
      this.utilProvider.fechaLoading();
    }, error => {
      console.log(error);
      this.utilProvider.fechaLoading();
    })
  }
}