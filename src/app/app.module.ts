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
import { ConfigProvider } from '../providers/config/config';
import { DatabaseProvider } from '../providers/database/database';

import { HomePage } from '../pages/home/home';
import { IntroPageModule } from '../pages/intro/intro.module';
import { FilmePageModule } from '../pages/filme/filme.module';
import { TrailerPageModule } from '../pages/trailer/trailer.module';
import { LancamentosPageModule } from '../pages/lancamentos/lancamentos.module';
import { PessoaPageModule } from '../pages/pessoa/pessoa.module';
import { FavoritosPageModule } from '../pages/favoritos/favoritos.module';
import { FavoritoListaPageModule } from '../pages/favorito-lista/favorito-lista.module';
import { FilmePesquisaPageModule } from '../pages/filme-pesquisa/filme-pesquisa.module';
import { GenerosPageModule } from '../pages/generos/generos.module';
import { GeneroFilmePageModule } from '../pages/genero-filme/genero-filme.module';

import { ModalElencoPageModule } from '../pages/modal-elenco/modal-elenco.module';
import { ModalTecnicaPageModule } from '../pages/modal-tecnica/modal-tecnica.module';
import { ModalSemelhantesPageModule } from '../pages/modal-semelhantes/modal-semelhantes.module';
import { ModalCastPageModule } from '../pages/modal-cast/modal-cast.module';
import { ModalCrewPageModule } from '../pages/modal-crew/modal-crew.module';
import { ModalBioPageModule } from '../pages/modal-bio/modal-bio.module';
import { ModalFavoritosPageModule } from '../pages/modal-favoritos/modal-favoritos.module';
import { ModalColecaoPageModule } from '../pages/modal-colecao/modal-colecao.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
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
    GenerosPageModule,
    GeneroFilmePageModule,
    ModalElencoPageModule,
    ModalTecnicaPageModule,
    ModalSemelhantesPageModule,
    ModalCastPageModule,
    ModalCrewPageModule,
    ModalBioPageModule,
    ModalFavoritosPageModule,
    ModalColecaoPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
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
    PhotoViewer,
    ConfigProvider
  ]
})
export class AppModule {}
