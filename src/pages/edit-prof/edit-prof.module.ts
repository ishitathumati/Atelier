import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfPage } from './edit-prof';

@NgModule({
  declarations: [
    EditProfPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfPage),
  ],
})
export class EditProfPageModule {}
