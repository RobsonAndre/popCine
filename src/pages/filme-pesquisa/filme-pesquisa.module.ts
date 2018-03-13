import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmePesquisaPage } from './filme-pesquisa';

@NgModule({
  declarations: [
    FilmePesquisaPage,
  ],
  imports: [
    IonicPageModule.forChild(FilmePesquisaPage),
  ],
})
export class FilmePesquisaPageModule {}
