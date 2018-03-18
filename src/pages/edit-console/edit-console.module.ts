import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditConsolePage } from './edit-console';

@NgModule({
  declarations: [
    EditConsolePage,
  ],
  imports: [
    IonicPageModule.forChild(EditConsolePage),
  ],
})
export class EditConsolePageModule {}
