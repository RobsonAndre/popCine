import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the ModalFavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-favoritos',
  templateUrl: 'modal-favoritos.html',
})
export class ModalFavoritosPage {
  public filme;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public viewController: ViewController
  ) {
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  ionViewDidEnter() {
    this.filme = this.navParams.get("arr");
    console.log('ionViewDidLoad ModalFavoritosPage');
  }

}
