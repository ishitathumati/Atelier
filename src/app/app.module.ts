import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { UserUploadsPage } from '../pages/user-uploads/user-uploads';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
<<<<<<< HEAD
import { NotificationsPage } from '../pages/notifications/notifications';
=======
import { ExplorePage } from '../pages/explore/explore';
import { NotificationsPage  } from '../pages/notifications/notifications';
>>>>>>> mbarigala

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EditProfPage } from '../pages/edit-prof/edit-prof';



@NgModule({
  declarations: [
    MyApp,
<<<<<<< HEAD
    HomePage,
    NotificationsPage,
    UserUploadsPage,
    ExplorePage,
    ProfilePage,
    EditProfPage,
    TabsPage
=======
    AboutPage,
    ContactPage,
    FeedPage,
    TabsPage,
    ExplorePage,
    NotificationsPage
>>>>>>> mbarigala
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    HomePage,
    NotificationsPage,
    UserUploadsPage,
    ExplorePage,
    ProfilePage,
    EditProfPage,
    TabsPage
=======
    AboutPage,
    ContactPage,
    FeedPage,
    TabsPage,
    ExplorePage,
    NotificationsPage

>>>>>>> mbarigala
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}