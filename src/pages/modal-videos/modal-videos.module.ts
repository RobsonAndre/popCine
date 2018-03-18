import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalVideosPage } from './modal-videos';

@NgModule({
  declarations: [
    ModalVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalVideosPage),
  ],
})
export class ModalVideosPageModule {}
