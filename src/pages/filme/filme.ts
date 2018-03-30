import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { PessoaPage } from '../pessoa/pessoa';
import { PopcineProvider } from '../../providers/popcine/popcine';
import { ConfigProvider } from '../../providers/config/config';

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
  public filmeAssisti;
  public filmeGostei;
  public filmeRecomendo;
  public user;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    public youtubeVideoPlayer: YoutubeVideoPlayer,
    public socialSharing: SocialSharing,
    public dbProvider: DatabaseProvider,
    public viewController: ViewController,
    public modalController: ModalController,
    public alertController: AlertController,
    public popcineProvider: PopcineProvider,
    public configProvider: ConfigProvider
  ) {

    this.creditos = {
      'crew': {}
    };
  
  }

  //alert confirm
  public confirmaRemove(idFilme) {
    let confirm = this.alertController.create({
      title: 'Remover Marcação?',
      message: 'Deseja remover a marca "Eu Assisti Este Filme"?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            //console.log('Disagree clicked');
            //return false;
          }
        },
        {
          text: 'Aceitar',
          handler: () => {
            //console.log('Agree clicked');
            
            return this.popcineProvider.desmarcarAssisti(this.user.token,this.user.uid,this.user.social,idFilme).subscribe(
              data=>{
                this.filmeAssisti = idFilme;
                this.utilProvider.showToast("Filme marcado como: Eu Assisti!")
                console.log('suc: ' + JSON.stringify(data));
                this.filmeAssisti   = "";
                this.filmeGostei    = "";
                this.filmeRecomendo = "";
                this.utilProvider.showToast("Todas a marcas deste filme foram removidas!")
              },error => {
                console.log('err: ' + JSON.stringify(error));
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }

  public assisti(idFilme){
    console.log("idFilme: " + idFilme );
    if(this.filmeAssisti){
      this.confirmaRemove(idFilme);
    }else{
      return this.popcineProvider.marcarAssisti(this.user.token,this.user.uid,this.user.social,idFilme).subscribe(
        data=>{
          this.filmeAssisti = idFilme;
          this.utilProvider.showToast("Filme marcado como: Eu Assisti!")
          console.log('suc: ' + JSON.stringify(data));
        },error => {
          console.log('err: ' + JSON.stringify(error));
        }
      )
    }
  }

  public gostei(idFilme, nota){
    console.log("idFilme: " + idFilme + "Nota: " + nota);
    
    if (this.filmeAssisti) {
      
      let gst;
        
      if(nota==0){
        return this.popcineProvider.desmarcarGostei(this.user.token,this.user.uid,this.user.social,idFilme).subscribe(
          data=>{ 
            this.filmeGostei = "";
            this.utilProvider.showToast("Removida da marca: Gostei!");
            console.log('suc:'+ JSON.stringify(data));
          },
          error=>{
            
            console.log("err: "+ JSON.stringify(error));

          });
      }else{
        return this.popcineProvider.marcarGostei(this.user.token,this.user.uid,this.user.social,idFilme,nota).subscribe(
          data=>{  
            this.filmeGostei = nota;
            if (nota == 5) {
              gst = "Gostei Muito Mesmo"
            } else if (nota == 4) {
              gst = "Gostei Bastante"
            } else if (nota == 3) {
              gst = "Gostei"
            } else if (nota == 2) {
              gst = "Gostei Um Pouco"
            } else if (nota == 1) {
              gst = "Nem Gostei"
          }
        
          this.utilProvider.showToast("Filme marcado como: "+ gst +"!");

          console.log('suc: ' + JSON.stringify(data));

        }, error =>{
          
          console.log('err: ' + JSON.stringify(error));
        
        })
      }
    }else{
      this.utilProvider.showToast("Ops, você não pode avaliar um filme que não assistiu!");
    }
  }

  public recomendo(idFilme){
    console.log("idFilme: " + idFilme );
    if(this.filmeAssisti){
      if(this.filmeRecomendo){
        return this.popcineProvider.desmarcarRecomendo(this.user.token,this.user.uid,this.user.social,idFilme).subscribe(
          data=>{
            this.filmeRecomendo = "";
            this.utilProvider.showToast("Removida a marca: Eu Recomendo Este Filme!")
            console.log('suc: ' + JSON.stringify(data));
          },error=>{
            console.log('err: ' + JSON.stringify(error));
          })
        
      }else{

        return this.popcineProvider.marcarRecomendo(this.user.token,this.user.uid,this.user.social,idFilme).subscribe(
          data=>{
            this.filmeRecomendo = idFilme;
            this.utilProvider.showToast("Filme marcado como: Eu Recomendo Este Filme!")
            console.log('suc: ' + JSON.stringify(data));
          },error=>{
            console.log('err: ' + JSON.stringify(error));
          })
      }
    }else{
      this.utilProvider.showToast("Ops, você não pode recomendar um filme que não assistiu!")
    }
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
    //Pegando os dados do usuário
    this.user = this.configProvider.getConfigUser();
    //Abrindo o loading
    this.utilProvider.abreLoading();
    //pegando o filme
    this.idFilme = this.navParams.get("id");
    //console.log('idFilme:'+this.idFilme);
    

    //verificando as marcacoes do filme
    //Verificando se assisti
    this.popcineProvider.verificarMarcaAssisti(this.user.token,this.user.uid,this.user.social,this.idFilme).subscribe(
      data=>{
        let obj:any=data; 
        if(obj.success){
          this.filmeAssisti = this.idFilme;
        }else{
          this.filmeAssisti = 0;
        }
        console.log('suc: ' + JSON.stringify(data));
      },error=>{
        console.log('err: ' + JSON.stringify(error));
      })
    
    //Verificando se gostei
    this.popcineProvider.verificarMarcaGostei(this.user.token,this.user.uid,this.user.social,this.idFilme).subscribe(
      data=>{
        let obj:any=data; 
        if(obj.success){
          this.filmeGostei = obj.nota;
        }else{
          this.filmeGostei = 0;
        }
        console.log('suc: ' + JSON.stringify(data));
      },error=>{
        console.log('err: ' + JSON.stringify(error));
      })
    
    //Verificando se recomendo
    this.popcineProvider.verificarMarcaRecomendo(this.user.token,this.user.uid,this.user.social,this.idFilme).subscribe(
      data=>{
        let obj:any=data; 
        if(obj.success){
          this.filmeRecomendo = this.idFilme;
        }else{
          this.filmeRecomendo = 0;
        }
        console.log('suc: ' + JSON.stringify(data));
      },error=>{
        console.log('err: ' + JSON.stringify(error));
      })




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