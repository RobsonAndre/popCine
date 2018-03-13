import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseProvider } from '../providers/database/database';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/intro/intro';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { FilmePesquisaPage } from '../pages/filme-pesquisa/filme-pesquisa';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;

  pages: Array<{title: string, component: any, tipo: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public dbProvider: DatabaseProvider  
  ) {

    dbProvider.createDataBase()
    .then(()=>{
      this.initializeApp();
    })
    .catch(()=>{
      //console.log("Erro ao iniciar o banco de dados")  
    })


  

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Lançamentos',       component: LancamentosPage,   tipo: 'lancamentos' },
      { title: 'Filmes em Destaque',component: HomePage,          tipo: 'populares' },
      { title: 'Melhor Avaliados',  component: HomePage,          tipo: 'top_rated' },
      { title: 'Em Exibição',       component: HomePage,          tipo: 'now_playing' },
      { title: 'Favoritos',         component: FavoritosPage,     tipo: '' },
      { title: 'Pesquisa',          component: FilmePesquisaPage, tipo: 'pesquisa' },
    /*{ title: 'List',              component: ListPage,          tipo: '' },*/
      { title: 'Intro',             component: IntroPage,         tipo: '' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log(page);
    this.nav.setRoot(page.component, { tipo : page.tipo } );
  }
}
