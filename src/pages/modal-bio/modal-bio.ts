import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the ModalBioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-bio',
  templateUrl: 'modal-bio.html',
})
export class ModalBioPage {

  public pessoa;

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
    this.pessoa = this.navParams.get('arr');
    console.log('ionViewDidLoad ModalBioPage');
  }

}
