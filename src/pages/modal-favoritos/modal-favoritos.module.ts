import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFavoritosPage } from './modal-favoritos';

@NgModule({
  declarations: [
    ModalFavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFavoritosPage),
  ],
})
export class ModalFavoritosPageModule {}
