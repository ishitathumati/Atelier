import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddArtPage } from './add-art';

@NgModule({
  declarations: [
    AddArtPage,
  ],
  imports: [
    IonicPageModule.forChild(AddArtPage),
  ],
})
export class AddArtPageModule {}
