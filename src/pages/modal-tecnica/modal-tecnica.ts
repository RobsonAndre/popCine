import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PessoaPage } from '../pessoa/pessoa';

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
    this.filme = this.navParams.get("arr");
    console.log(this.filme);
    this.equipe = this.filme.credits.crew;
    console.log(this.equipe);
    //console.log('ionViewDidLoad ModalTecnicaPage');
  }

}
