import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UtilProvider } from '../../providers/util/util';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ConfigProvider } from '../../providers/config/config';

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
    public configProvider: ConfigProvider
  ) {
    let date = new Date();

    this.user = {
      id: 0,
      tipo: 'facebook',
      token: '',
      email: '',
      nome: '',
      imagem: '',
      sexo: '',
      data_entrada: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString(),
      data_saida: '0'
    }

  }
  /**/
  public loginFB(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status==="connected"){
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

  public logoutFB(){
    this.logIn = false;
    this.fb.logout()
    .then(res =>{
      //gravar saida na base de dados
      this.userSaida(this.user.id);
    })
    .catch(err=>{
      console.log("#8 err: "+err);
    })
  }

  private getDatails(id){
    this.fb.api("/"+id+"/?fields=id,email,name,picture,gender",['public_profile'])
    .then(res=>{
      this.user.id = res.id;
      this.user.email = res.email;
      this.user.nome = res.name;
      this.user.imagem = res.picture.data.url;
      this.user.sexo = res.gender;
      
      this.insertLogin(this.user);
    
    })
    .catch(err=>{
      console.log('err: '+ err);
    });  
  }
  //gravando a saida
  public userSaida(id){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql  = "DELETE user_login WHERE id = ? ";
        let data = [id];
        return db.executeSql(sql, data)
          .then(() => {
            this.logIn = false;
            let user = { id : 0 };
            //Gravando no localStorage
            //localStorage.setItem('config', JSON.stringify(user));
            console.log('#6 suc : usuario saiu');
            ///this.utilProvider.showToast("suc: usuario inserido com sucesso.");
          })
          .catch(
            e => {
              console.log('#7 err :' + JSON.stringify(e));
              //this.utilProvider.showToast("err: " + e);
            }
          );
      })
      .catch(
        e => {
          console.log(e)
        }
      );
  }
  //insert na base de dados
  public insertLogin(user) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql  = "INSERT INTO user_login (id_social, tipo_social, email, nome, imagem, sexo, data_entrada) VALUES (?, ?, ?, ?, ?, ?, ?)";
        let data = [user.id, user.tipo, user.email, user.nome, user.imagem, user.sexo, user.data_entrada];
        return db.executeSql(sql, data)
          .then(() => {
            this.logIn = true;
            console.log('#5 suc : usuario logado');
            
            localStorage.setItem('user', JSON.stringify(this.user));

            ///this.utilProvider.showToast("suc: usuario inserido com sucesso.");
          })
          .catch(
            e => {
              console.log('#4 err :' + JSON.stringify(e));
              //this.utilProvider.showToast("err: " + e);
            }
          );
      })
      .catch(
        e => {
          console.log(e)
        }
      );
  }
  /**/

  public verificaLogin() {
    console.log("================= VerificaLogin =====================");
    this.utilProvider.abreLoading();
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = " SELECT * FROM user_login ORDER BY data_saida";
        let data = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log('#1 sus: ' + JSON.stringify(data.rows));
            if (data.rows.length > 0) {
              let res = data.rows.item(0);
              this.user.id = res.id_social;
              this.user.tipo = res.tipo_social;
              this.user.email = res.email;
              this.user.nome = res.nome;
              this.user.imagem = res.imagem;
              this.user.sexo = res.sexo;
              this.user.data_entrada = res.data_entrada;

              //Gravando no local storage
              localStorage.setItem('user', JSON.stringify(this.user));

              //Marcando como login true;
              this.logIn = true;
            }
            this.utilProvider.fechaLoading();
          })
          .catch(err => {
            console.log('#1 err: ' + JSON.stringify(err));
            this.utilProvider.fechaLoading();
          });
      })
      .catch(err => {
        console.log('#2 err: ' + JSON.stringify(err));
        this.utilProvider.fechaLoading();
      });
  }

  ionViewDidLoad() {

    console.log('LoginFacebookPage Ok');
    console.log('id     : ' + this.user.id);
    console.log('tipo   : ' + this.user.tipo);
    console.log('email  : ' + this.user.email);
    console.log('nome   : ' + this.user.nome);
    console.log('imagem : ' + this.user.imagem);
    console.log('sexo   : ' + this.user.sexo);
    console.log('entr   : ' + this.user.data_entrada);
    console.log('said   : ' + this.user.data_saida);

    localStorage.setItem('user', JSON.stringify(this.user));

    let userData = this.configProvider.getConfigUser();
    if(userData == null || userData.id == 0){
      this.verificaLogin();
    }else{
      this.user = userData;
      this.logIn = true;
      console.clear();
      console.log('LoginFacebookPage Ok');
      console.log('id     : ' + this.user.id);
      console.log('tipo   : ' + this.user.tipo);
      console.log('email  : ' + this.user.email);
      console.log('nome   : ' + this.user.nome);
      console.log('imagem : ' + this.user.imagem);
      console.log('sexo   : ' + this.user.sexo);
      console.log('entr   : ' + this.user.data_entrada);
      console.log('said   : ' + this.user.data_saida);
    }
  }
}
