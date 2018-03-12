import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritoListaPage } from './favorito-lista';

@NgModule({
  declarations: [
    FavoritoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritoListaPage),
  ],
})
export class FavoritoListaPageModule {}
