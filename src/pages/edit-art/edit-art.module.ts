import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditArtPage } from './edit-art';

@NgModule({
  declarations: [
    EditArtPage,
  ],
  imports: [
    IonicPageModule.forChild(EditArtPage),
  ],
})
export class EditArtPageModule {}
