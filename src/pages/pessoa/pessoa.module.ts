import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaPage } from './pessoa';

@NgModule({
  declarations: [
    PessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(PessoaPage),
  ],
})
export class PessoaPageModule {}
