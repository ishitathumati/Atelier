import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserUploadsPage } from './user-uploads';

@NgModule({
  declarations: [
    UserUploadsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserUploadsPage),
  ],
})
export class UserUploadsPageModule {}
