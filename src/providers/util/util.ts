import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, MenuController, ModalController } from 'ionic-angular';
//import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { PhotoViewer } from '@ionic-native/photo-viewer';


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
    public modalController: ModalController,
    public photoViewer: PhotoViewer
  ) {
    //console.log('Hello UtilProvider Provider');
  }
  
  public abreImagem(path, label){
    this.photoViewer.show(path, label, {share: true});
  }

  public openModal(pageModal,arr){
    //console.log("Open Modal: "+ pageModal);
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
  public mascaraData(str){
    if(str){
      return  str.substr(8,2)+"/"+str.substr(5,2)+"/"+str.substr(0,4);
    }else{
      return str;
    }
  }

  public mascaraIdade(str){
  
    let strMS = Date.parse(Date()) - Date.parse(str);
    let data = new Date();
    data.setTime(strMS);
    let idade = data.getFullYear() - 1970;
  
    return idade + ' anos';
  }

  public mascaraRound(num){
    return (num).toFixed(2);
  }
  //Loading
  public abreLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  public fechaLoading() {
    this.loader.dismiss();
  }

  //Toast
  public showToast(msg: string) {

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