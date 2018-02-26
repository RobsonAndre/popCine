import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmePage } from './filme';

@NgModule({
  declarations: [
    FilmePage,
  ],
  imports: [
    IonicPageModule.forChild(FilmePage),
  ],
})
export class FilmePageModule {}
