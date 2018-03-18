import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsolesPage } from './consoles';

@NgModule({
  declarations: [
    ConsolesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsolesPage),
  ],
})
export class ConsolesPageModule {}
