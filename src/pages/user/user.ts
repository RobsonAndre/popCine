import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Facebook } from '@ionic-native/facebook';
import { LoginFacebookPage } from '../login-facebook/login-facebook';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public user;
  public logIn;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public fb: Facebook,
    public utilProvider: UtilProvider
  ) {

  }
  
  /**/
  public logoutFB(){
    this.utilProvider.abreLoading();
    this.fb.logout()
    .then(res =>{
      let user = {uid:0};
      this.configProvider.setConfigUser(user);
      this.logIn = false;
      this.utilProvider.fechaLoading();
      window.location.reload(true);
      //this.navCtrl.setRoot(LoginFacebookPage);
      //console.log("#12 sus: "+ res);
    })
    .catch(err=>{
      this.logIn = false;
      this.utilProvider.fechaLoading();
      console.log("#8 err: "+err);
    })
  }
  /**/
  
  ionViewDidEnter() {
    //console.log("----" + this.user.uid);
    this.user = this.configProvider.getConfigUser();
    if (this.user == null || this.user.uid == 0) {
      //console.log("Nao:"  + JSON.stringify(this.user));
      this.logIn = false;
      this.navCtrl.setRoot(LoginFacebookPage);
    } else {
      //console.log("Sim:"  + JSON.stringify(this.user));
      this.user.conta = this.user.conta + 1;
      this.configProvider.setConfigUser(this.user);
      this.logIn = true;
    }
    console.log('UserPage Ok');
  }

}
