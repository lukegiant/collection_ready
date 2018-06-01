import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExibeConsolePage } from './exibe-console';

@NgModule({
  declarations: [
    ExibeConsolePage,
  ],
  imports: [
    IonicPageModule.forChild(ExibeConsolePage),
  ],
})
export class ExibeConsolePageModule {}
