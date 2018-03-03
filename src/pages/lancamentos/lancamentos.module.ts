import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentosPage } from './lancamentos';

@NgModule({
  declarations: [
    LancamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentosPage),
  ],
})
export class LancamentosPageModule {}
