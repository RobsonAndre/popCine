import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalBioPage } from './modal-bio';

@NgModule({
  declarations: [
    ModalBioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBioPage),
  ],
})
export class ModalBioPageModule {}
