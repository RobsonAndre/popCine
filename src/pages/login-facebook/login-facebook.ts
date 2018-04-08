import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UtilProvider } from '../../providers/util/util';
import { DatabaseProvider } from '../../providers/database/database';
import { ConfigProvider } from '../../providers/config/config';
import { PopcineProvider } from '../../providers/popcine/popcine';
import { UserPage } from '../user/user';

/**
 * Generated class for the LoginFacebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-facebook',
  templateUrl: 'login-facebook.html',
})
export class LoginFacebookPage {

  public logIn: boolean = false;
  public user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: Facebook,
    public utilProvider: UtilProvider,
    public dbProvider: DatabaseProvider,
    public configProvider: ConfigProvider,
    public popcineProvider: PopcineProvider,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    let date = new Date();
    //Montando o objeto USER
    this.user = {
      uid: 0,
      social: 'facebook',
      entrada: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
    }
  }

  public abreDocs(tp){
    let modalPage
    if(tp=='t'){
      modalPage = this.modalController.create('ModalTermoPage',{'tp':tp});
    }
    if(tp=='p'){
      modalPage = this.modalController.create('ModalTermoPage',{'tp':tp});
    }
    modalPage.present();
    
  }
  public termoConfirma(lgn) {
    let alert = this.alertController.create({
      title: 'Termos de Uso e Política de Privacidade',
      message: 'Confirmo que li, entendi e concordo com os Termos de Uso e Política de Privacidade.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            if(lgn=='fb'){
              this.loginFB();
            }
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  /**/
  private getToken(user){
    return this.popcineProvider.getToken(user.uid,user.social).subscribe(
      data=>{
        let obj: any = data;
        if(obj.success){
          this.user.token  = obj.token;
          this.user.conta  = 0;
          //console.log("Token: "+ this.user.token);
          this.configProvider.setConfigUser(this.user);
          this.logIn = true;
          //window.location.reload(true);
          this.navCtrl.setRoot(UserPage);
          this.utilProvider.fechaLoading();
        }
        //console.log('suc: ' + JSON.stringify(data));
      },error => {
        console.log('#9 err: ' + JSON.stringify(error));
      }
    )
  }
  /**/
  public loginFB(){
    this.utilProvider.abreLoading();
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      /** /
      console.log("--------------------------");
      console.log(JSON.stringify(res));
      console.log("--------------------------");
      /**/
      if(res.status==="connected"){
        //this.user.expiresIn = res.authResponse.expiresIn; 
        this.getDatails(res.authResponse.userID);
      }else{
        console.log("User Desconectado")
      }
    })
    .catch(err => {
      console.log('Error logging into Facebook', err)
      this.utilProvider.showToast("#9 err: " + err);
      this.utilProvider.fechaLoading();
    });
  }

  private getDatails(id){
    this.fb.api("/"+id+"/?fields=id,email,name,picture.type(large),gender,cover,first_name,last_name,age_range,link,locale,timezone,updated_time,verified",['public_profile'])
    .then(res=>{
      let date = new Date();
      /**/ 
      this.user.uid     = res.id;
      this.user.email   = res.email;
      this.user.nome    = res.name;
      this.user.imagem  = res.picture.data.url; 
      this.user.sexo    = res.gender;
      this.user.social  = 'facebook';
      this.user.entrada = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
      this.user.cover   = res.cover;
      this.user.verified= res.verified;
      /** /
      this.user.first_name  = res.first_name;
      this.user.last_name   = res.last_name;
      this.user.age_range   = res.age_range;
      this.user.link        = res.link;
      this.user.locale      = res.locale;
      this.user.timezone    = res.timezone;
      this.user.updated_time= res.updated_time;
      /**/
      
      //pegando o token
      this.getToken(this.user);

      //this.insertLogin(this.user);
    
    })
    .catch(err=>{
      console.log('#11 err: '+ err);
    });  
  }
  /** /
  public logoutFB(){
    this.fb.logout()
    .then(res =>{
      let user = {uid:0};
      this.configProvider.setConfigUser(user);
      this.logIn = false;
      //console.log("#12 sus: "+ res);
    })
    .catch(err=>{
      this.logIn = false;
      console.log("#8 err: "+err);
    })
  }
  /**/
  ionViewDidEnter() {
    //console.log("----" + this.user.uid);
    this.user = this.configProvider.getConfigUser();
    
    console.log(JSON.stringify(this.user));
    
    if(this.user == null || this.user.uid == 0){
      //console.log("Nao:"  + JSON.stringify(this.user));
      this.logIn = false;
    }else{
      //console.log("Sim:"  + JSON.stringify(this.user));
      this.logIn = true;
      this.navCtrl.setRoot(UserPage);
    }
  }
}