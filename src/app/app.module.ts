import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { UtilProvider } from '../providers/util/util';
import { FilmesProvider } from '../providers/filmes/filmes';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPageModule } from '../pages/intro/intro.module';
import { FilmePageModule } from '../pages/filme/filme.module';
import { TrailerPageModule } from '../pages/trailer/trailer.module';
import { LancamentosPageModule } from '../pages/lancamentos/lancamentos.module';
import { DatabaseProvider } from '../providers/database/database';
import { PessoaPageModule } from '../pages/pessoa/pessoa.module';
import { FavoritosPageModule } from '../pages/favoritos/favoritos.module';
import { FavoritoListaPageModule } from '../pages/favorito-lista/favorito-lista.module';

import { ModalElencoPageModule } from '../pages/modal-elenco/modal-elenco.module';
import { ModalTecnicaPageModule } from '../pages/modal-tecnica/modal-tecnica.module';
import { ModalSemelhantesPageModule } from '../pages/modal-semelhantes/modal-semelhantes.module';
import { ModalCastPageModule } from '../pages/modal-cast/modal-cast.module';
import { ModalCrewPageModule } from '../pages/modal-crew/modal-crew.module';
import { ModalBioPageModule } from '../pages/modal-bio/modal-bio.module';
import { ModalFavoritosPageModule } from '../pages/modal-favoritos/modal-favoritos.module';
import { FilmePesquisaPageModule } from '../pages/filme-pesquisa/filme-pesquisa.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule,
    HttpModule,
    HttpClientModule,
    FilmePageModule,
    TrailerPageModule,
    LancamentosPageModule,
    PessoaPageModule,
    FavoritosPageModule,
    FavoritoListaPageModule,
    FilmePesquisaPageModule,
    ModalElencoPageModule,
    ModalTecnicaPageModule,
    ModalSemelhantesPageModule,
    ModalCastPageModule,
    ModalCrewPageModule,
    ModalBioPageModule,
    ModalFavoritosPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    Network,
    SocialSharing,
    SQLite, 
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilmesProvider,
    UtilProvider,
    DatabaseProvider,
    PhotoViewer
  ]
})
export class AppModule {}
