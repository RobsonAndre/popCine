import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmePopoverPage } from './filme-popover';

@NgModule({
  declarations: [
    FilmePopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FilmePopoverPage),
  ],
})
export class FilmePopoverPageModule {}
