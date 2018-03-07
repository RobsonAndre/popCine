import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { FilmePage } from '../filme/filme';

/**
 * Generated class for the ModalCastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-cast',
  templateUrl: 'modal-cast.html',
})
export class ModalCastPage {
  
  public pessoa;
  public cast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public viewController: ViewController
  ) {
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
  }

  public closeModal(){
    this.viewController.dismiss();
  }


  ionViewDidEnter() {
    this.pessoa = this.navParams.get('arr');
    this.cast = this.pessoa.credits.cast;

    this.cast.sort(function (a, b) {
      if (a.release_date > b.release_date)
        return -1;
      if (a.release_date < b.release_date)
        return 1;
      return 0;
    });

    console.log(this.cast);
  }

}
