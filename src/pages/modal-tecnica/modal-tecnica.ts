import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  public Equipe;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController
  ) {
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  
  ionViewDidLoad() {
    this.Equipe = this.navParams.get("arr");
    console.log(this.Equipe);
    //console.log('ionViewDidLoad ModalTecnicaPage');
  }

}
