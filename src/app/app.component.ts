import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseProvider } from '../providers/database/database';
import { ConfigProvider } from '../providers/config/config';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
//import { FavoritosPage } from '../pages/favoritos/favoritos';
//import { FilmePesquisaPage } from '../pages/filme-pesquisa/filme-pesquisa';
//import { GenerosPage } from '../pages/generos/generos';
import { LoadingPage } from '../pages/loading/loading';
import { LoginFacebookPage } from '../pages/login-facebook/login-facebook';

/**/
import { enableProdMode } from '@angular/core';
import { UserPage } from '../pages/user/user';

enableProdMode();
/**/

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = IntroPage;
  rootPage: any;

  public pages: Array<{ title: string, component: any, tipo: string }>;
  public user;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public dbProvider: DatabaseProvider,
    public configProvider: ConfigProvider
  ) {
    //Pegando o usuario
    this.user = this.configProvider.getConfigUser();
    //apresenta o loading ate a rootPage esta pronta.
    this.rootPage = LoadingPage;
    /**/
    dbProvider.createDataBase()
    .then(() => {
      this.initializeApp();
    })
    .catch(() => {
      //console.log("Erro ao iniciar o banco de dados")  
    });

    if(this.user.uid){
      this.pages = [
        { title: 'Filmes', component: HomePage,          tipo: 'now_playing' }
      ]
      console.log(this.user.uid);
    } else { 
      this.pages = [
        { title: 'Login',   component: LoginFacebookPage, tipo: 'login' },
        { title: 'Filmes',  component: HomePage,          tipo: 'now_playing' }
      ]
    }
    /** /
    { title: 'Em Exibição', component: HomePage, tipo: 'now_playing' },
    { title: 'Filmes em Destaque', component: HomePage, tipo: 'populares' },
    { title: 'Favoritos', component: FavoritosPage, tipo: '' },
    { title: 'Gêneros', component: GenerosPage, tipo: '' },
    { title: 'Lançamentos', component: HomePage, tipo: 'upcoming' },
    { title: 'Melhor Avaliados', component: HomePage, tipo: 'top_rated' },
    { title: 'Pesquisa', component: FilmePesquisaPage, tipo: 'pesquisa' },
    { title: 'Login', component: LoginFacebookPage, tipo: 'login' }
    /**/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      // Intro slideShow - LocalStorage 
      let config = JSON.parse(this.configProvider.getConfigData());
      if (config == null) {
        this.rootPage = IntroPage;
        this.configProvider.setConfigData(true);
      } else if (config.showSlide == false) {
        this.rootPage = IntroPage;
        this.configProvider.setConfigData(true);
      } else {
        this.user = this.configProvider.getConfigUser();
        if(this.user.conta==0){
          this.user.conta = this.user.conta + 1;
          this.configProvider.setConfigUser(this.user);
          this.rootPage = UserPage;
        }else{
          this.rootPage = HomePage;
        }
      }
      //Ocultar a splashScreen 
      this.splashScreen.hide();
    });
  }

  abreConfig(){
    console.log("Abre Config");
    
    this.nav.setRoot(UserPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);
    this.nav.setRoot(page.component, { tipo: page.tipo });
  }

  menuOpened(){
    //Pegando o usuario
    this.user = this.configProvider.getConfigUser();
    console.log("Open: " + this.user.uid);
  }

  ionViewDidEnter() {

    //Pegando o usuario
    this.user = this.configProvider.getConfigUser();
    console.log("Enter: " + this.user.uid);

  }

}
