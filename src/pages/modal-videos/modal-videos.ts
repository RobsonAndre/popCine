import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalVideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-videos',
  templateUrl: 'modal-videos.html',
})
export class ModalVideosPage {
  public filme;
  public videos;

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
    console.log("ModalVideosPage Ok");
    this.videos = this.navParams.get("arr");
    this.filme  = this.navParams.get("filme");
    console.log(this.videos);
  }

}
