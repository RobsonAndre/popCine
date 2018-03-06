import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalElencoPage } from './modal-elenco';

@NgModule({
  declarations: [
    ModalElencoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalElencoPage),
  ],
})
export class ModalElencoPageModule {}
