import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { UtilProvider } from '../providers/util/util';
import { FilmesProvider } from '../providers/filmes/filmes';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPageModule } from '../pages/intro/intro.module';
import { FilmePageModule } from '../pages/filme/filme.module';
import { TrailerPageModule } from '../pages/trailer/trailer.module';
import { LancamentosPageModule } from '../pages/lancamentos/lancamentos.module';

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
    LancamentosPageModule
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilmesProvider,
    UtilProvider
  ]
})
export class AppModule {}
