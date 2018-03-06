import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PessoaPage } from '../pessoa/pessoa';

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
})
export class ModalElencoPage {
  public Elenco;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalController: ModalController,
    public viewController: ViewController
  ) {
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  public abrePessoa(idPessoa){
    this.navCtrl.push(PessoaPage, {'id':idPessoa});
    console.log(idPessoa);
  }

  ionViewDidLoad() {
    this.Elenco = this.navParams.get("arr");
    console.log('---'+this.Elenco);
    console.log('ionViewDidLoad ModalElencoPage');
  }

}
