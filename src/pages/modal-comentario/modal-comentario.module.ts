import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalComentarioPage } from './modal-comentario';

@NgModule({
  declarations: [
    ModalComentarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalComentarioPage),
  ],
})
export class ModalComentarioPageModule {}
