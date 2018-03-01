import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

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
    public network: Network,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController

  ) {
    console.log('Hello UtilProvider Provider');
  }

  //Network
  verificaConexao() {
    console.log('Antes');
    this.network.onConnect().subscribe(() => {
      //not getting called
      //alert("Online!");
    });
    this.network.onDisconnect().subscribe(() => {
      //getting called
      alert("Dispositivo Offline!");
    });
    /** /
    console.log('Antes');
    this.network.onConnect().subscribe((data )=> {
      console.log('Durante');
      console.log('-->>' + data);
    }, error => {
      console.error(error)
    });
    console.log('Depois');
    
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
    }, error => console.error(error));
    /* */
  }
  //Loading
  abreLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  fechaLoading() {
    this.loader.dismiss();
  }

  //Toast
  showToast(msg: string) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

}