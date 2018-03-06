import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, MenuController, ModalController } from 'ionic-angular';
//import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
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
    public toastCtrl: ToastController,
    public menuController: MenuController,
    public modalController: ModalController
  ) {
    //console.log('Hello UtilProvider Provider');
  }

  public openModal(pageModal,arr){
    console.log("Open Modal: "+ pageModal);
    var modalPage = this.modalController.create(pageModal,{'arr': arr}); 
    modalPage.present();
  }

  
  //Network
  verificaConexao() {
    //console.log('Antes');
    this.network.onConnect().subscribe(() => {
      //not getting called
      //alert("Online!");
    });
    this.network.onDisconnect().subscribe(() => {
      //getting called
      //alert("Dispositivo Offline!");
      this.showToast("Dispositivo Offline!");
    });
  }
  //mascara data converte data do formarto aaaa/mm/dd para dd/mm/yyyy
  mascaraData(str){
    return  str.substr(8,2)+"/"+str.substr(5,2)+"/"+str.substr(0,4);
      
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

  /**/
  public abreMenuToggle(){
      this.menuController.open();
  }
}