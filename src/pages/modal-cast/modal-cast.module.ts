import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCastPage } from './modal-cast';

@NgModule({
  declarations: [
    ModalCastPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCastPage),
  ],
})
export class ModalCastPageModule {}
