import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneroFilmePage } from './genero-filme';

@NgModule({
  declarations: [
    GeneroFilmePage,
  ],
  imports: [
    IonicPageModule.forChild(GeneroFilmePage),
  ],
})
export class GeneroFilmePageModule {}
