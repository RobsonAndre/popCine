import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the TrailerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trailer',
  templateUrl: 'trailer.html',
})
export class TrailerPage {
  private urlVideo  = "https://www.youtube.com/embed/";
  private urlAction = "?rel=1&amp;controls=1&amp;showinfo=0&arp;autoplay=1";
  private strVideo;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public domSanitizer: DomSanitizer,
      public youtubeVideoPlayer: YoutubeVideoPlayer
    ) {
  }

  public openVideo(){
    this.youtubeVideoPlayer.openVideo('EwJeYSGzRkM');
    console.log("openVideo");
  }

  public sanitize(strVideo){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlVideo + strVideo + this.urlAction);
  }

  ionViewDidEnter() {
    this.strVideo = this.navParams.get("str");
    //this.youtube.openVideo(this.navParams.get("str"));
    this.youtubeVideoPlayer.openVideo('EwJeYSGzRkM');
    console.log(this.strVideo);
  }

}
