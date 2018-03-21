import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UtilProvider } from '../../providers/util/util';

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
  public user: any = { };

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public fb: Facebook,
      public utilProvider: UtilProvider
    ) {
      this.fb.getLoginStatus()
      .then( res =>{
        console.log("res => " + res.status )
        console.log("res => " + res.name )
        if(res.status === "connected"){
          this.logIn = true;
        }else{
          this.logIn = false;
        }
      })
      .catch(err =>{
        this.utilProvider.showToast("err: "+ err);
      });
      /** /
      this.user = {
        name:'Robson Andre',
        email:'robson_x@yahoo.com.br',
        img:'../assets/imgs/img.jpg'
      }
      /**/
  }

  public loginFB(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status==="connected"){
        this.logIn = true;
        this.getDatails(res.authResponse.userID);
      }else{
        this.logIn = false;
      }
      //console.log('Logged into Facebook!', res)
      //this.utilProvider.showToast("FB: " + res);
    })
    .catch(err => {
      console.log('Error logging into Facebook', err)
      this.utilProvider.showToast("err: " + err);
    });
  }

  public logoutFB(){
    this.fb.logout()
    .then(res =>{
      this.logIn = false;
    })
    .catch(err=>{
      console.log("err: "+err);
    })
  }

  private getDatails(id){
    this.fb.api("/"+id+"/?fields=id,email,name,picture,gender",['public_profile'])
    .then(res=>{
      console.log('res: '+ res);
      /**/
      this.user.id = res.id;
      console.log('id: '+ this.user.id);
      this.user.email = res.email;
      console.log('id: '+ this.user.email);
      this.user.name = res.name;
      console.log('id: '+ this.user.name);
      this.user.picture = res.picture.data.url;
      console.log('id: '+ this.user.picture);
      this.user.gender = res.gender;
      console.log('id: '+ this.user.gender);
      /**/
      //this.user = res;
    })
    .catch(err=>{
      console.log('err: '+ err);
    });  
  }

  ionViewDidLoad() {

    console.log('LoginFacebookPage Ok');
    console.log('login: '+ this.logIn);
  
  }

}
