import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PessoaPage } from '../pessoa/pessoa';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the ModalElencoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-modal-elenco',
  templateUrl: 'modal-elenco.html',
  providers: [
    UtilProvider
  ]
})

export class ModalElencoPage {
  
  public idFilme;
  public filme;
  public elenco;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalController: ModalController,
    public viewController: ViewController,
    public utilProvider: UtilProvider
  ) {
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  public abrePessoa(idPessoa){
    this.navCtrl.push(PessoaPage, {'id':idPessoa});
    console.log(idPessoa);
  }

  ionViewDidEnter() {
    this.filme = this.navParams.get("filme");
    this.elenco = this.navParams.get("arr");
    //this.elenco = this.filme.credits.cast;
    console.log(this.filme);
    console.log('ModalElencoPage Ok');
  }

}
