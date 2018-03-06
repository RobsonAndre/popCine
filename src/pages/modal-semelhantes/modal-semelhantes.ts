import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FilmePage } from '../filme/filme';

/**
 * Generated class for the ModalSemelhantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-semelhantes',
  templateUrl: 'modal-semelhantes.html',
})
export class ModalSemelhantesPage {

  public Semelhantes;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController
  ) {
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
    console.log(id);
  }

  ionViewDidLoad() {
    this.Semelhantes = this.navParams.get("arr");
    console.log(this.Semelhantes);
    //console.log('ionViewDidLoad ModalSemelhantesPage');
  }

}
