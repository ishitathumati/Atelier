import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserUploadPage } from './user-upload';

@NgModule({
  declarations: [
    UserUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(UserUploadPage),
  ],
})
export class UserUploadPageModule {}
