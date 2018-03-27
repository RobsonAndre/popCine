import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UtilProvider } from '../../providers/util/util';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ConfigProvider } from '../../providers/config/config';
import { PopcineProvider } from '../../providers/popcine/popcine';

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
    public popcineProvider: PopcineProvider
  ) {
    let date = new Date();
    //Montando o objeto USER
    this.user = {
      uid: 0,
      social: 'facebook',
      entrada: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
    }
  }

  /**/
  private getToken(user){
    return this.popcineProvider.getToken(user.uid,user.social).subscribe(
      data=>{
        let obj: any = data;
        if(obj.success){
          this.user.token  = obj.token;
          console.log("Token: "+ this.user.token);
          this.configProvider.setConfigUser(this.user);
          this.logIn = true;
        }
        //console.log('suc: ' + JSON.stringify(data));
      },error => {
        console.log('#9 err: ' + JSON.stringify(error));
      }
    )
  }
  /**/
  public loginFB(){
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
  /**/
  public logoutFB(){
    this.logIn = false;
    this.fb.logout()
    .then(res =>{
      let user = {id:0};
      this.configProvider.setConfigUser(user);
      this.logIn = false;
      //console.log("#12 sus: "+ res);
    })
    .catch(err=>{
      console.log("#8 err: "+err);
    })
  }
  /**/
  ionViewDidLoad() {
    //console.log("----" + this.user.uid);
    this.user = this.configProvider.getConfigUser();
    if(this.user == null || this.user.uid == 0){
      //console.log("Nao:"  + JSON.stringify(this.user));
      this.logIn = false;
    }else{
      //console.log("Sim:"  + JSON.stringify(this.user));
      this.logIn = true;
    }
  }
}