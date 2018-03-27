import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaleriaImagensPage } from './galeria-imagens';

@NgModule({
  declarations: [
    GaleriaImagensPage,
  ],
  imports: [
    IonicPageModule.forChild(GaleriaImagensPage),
  ],
})
export class GaleriaImagensPageModule {}
