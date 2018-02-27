import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { TrailerPage } from '../trailer/trailer';

/**
 * Generated class for the FilmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme',
  templateUrl: 'filme.html',
  providers: [
    FilmesProvider,
    UtilProvider
  ]
})
export class FilmePage {

  public filme;
  public idFilme;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider,
    private toastCtrl: ToastController
  ) {
  }

  showToast(msg: string) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

  public abreTrailer(str) {
    this.navCtrl.push(TrailerPage, { str: str });
    console.log(str);
  }

  ionViewDidEnter() {
    this.utilProvider.abreLoading();
    this.idFilme = this.navParams.get("id");
    //console.log('idFilme:'+this.idFilme);
    this.filmesProvider.mostrarFilme(this.idFilme).subscribe(data => {
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
      if (this.filme.videos.results.length) {
        this.filme.trailer = this.filme.videos.results[0].key;
        //console.log(this.filme.videos.results[0].key);
        console.log(this.filme.videos.results.length);
      } else {
        this.filme.trailer = "";
      }
      //console.log(this.filme);
      this.utilProvider.fechaLoading();
    }, error => {
      console.log(error);
      this.utilProvider.fechaLoading();
    })
  }
}