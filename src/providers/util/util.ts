import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  public loader;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello UtilProvider Provider');
  }

  abreLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  fechaLoading(){
    this.loader.dismiss();
  }

}