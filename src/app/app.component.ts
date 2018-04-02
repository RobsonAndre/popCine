import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseProvider } from '../providers/database/database';
import { ConfigProvider } from '../providers/config/config';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { FilmePesquisaPage } from '../pages/filme-pesquisa/filme-pesquisa';
import { GenerosPage } from '../pages/generos/generos';
import { LoadingPage } from '../pages/loading/loading';
import { LoginFacebookPage } from '../pages/login-facebook/login-facebook';

/**/
import { enableProdMode } from '@angular/core';

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

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public dbProvider: DatabaseProvider,
    public configProvider: ConfigProvider
  ) {

    //apresenta o loading ate a rootPage esta pronta.
    this.rootPage = LoadingPage;
    /**/
    dbProvider.createDataBase()
      .then(() => {
        this.initializeApp();
      })
      .catch(() => {
        //console.log("Erro ao iniciar o banco de dados")  
      })


    this.pages = [
      { title: 'Filmes',            component: HomePage,          tipo: 'now_playing' },
      { title: 'Lista por Gêneros', component: GenerosPage,       tipo: '' },
      { title: 'Meus Favoritos',    component: FavoritosPage,     tipo: '' },
      { title: 'Pesquisa',          component: FilmePesquisaPage, tipo: 'pesquisa' },
      { title: 'Login',             component: LoginFacebookPage, tipo: 'login' }
    
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
    ];
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
        this.rootPage = HomePage;
      }
      //Ocultar a splashScreen 
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);
    this.nav.setRoot(page.component, { tipo: page.tipo });
  }
}
