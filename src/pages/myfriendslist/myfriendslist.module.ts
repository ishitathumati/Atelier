import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyfriendslistPage } from './myfriendslist';

@NgModule({
  declarations: [
    MyfriendslistPage,
  ],
  imports: [
    IonicPageModule.forChild(MyfriendslistPage),
  ],
})
export class MyfriendslistPageModule {}
