import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PessoaPage } from '../pessoa/pessoa';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the ModalTecnicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-tecnica',
  templateUrl: 'modal-tecnica.html',
})
export class ModalTecnicaPage {

  public filme;
  public equipe;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController,
    public filmesProvider: FilmesProvider,
    public youtubeVideoPlayer: YoutubeVideoPlayer
  ) {
  }

  public openVideo(idVideo) {
    this.youtubeVideoPlayer.openVideo(idVideo);
  }
  
  public moeda(vlr){
    return vlr.toLocaleString('pt-BR');
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  public abrePessoa(idPessoa){
    this.navCtrl.push(PessoaPage, {'id':idPessoa});
    console.log(idPessoa);
  }

  ionViewDidLoad() {
    console.log("ModalTecnicaPage Ok");
    this.filme = this.navParams.get("arr");
    this.equipe = this.filme.credits.crew;
    //console.log(this.equipe);
    //console.log('ionViewDidLoad ModalTecnicaPage');
  }

}
