import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './firebase.config';
import { UserUploadsPage } from '../pages/user-uploads/user-uploads';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EditProfPage } from '../pages/edit-prof/edit-prof';
import { CommentsPage } from '../pages/comments/comments';
import { LoginPage} from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
//import { MyApp } from '../app/app.component'; 
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { Camera } from '@ionic-native/camera';
//import { SMS } from '@ionic-native/sms/ngx';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { AddArtPage } from '../pages/add-art/add-art';
import { ActivityPage } from '../pages/activity/activity';
import { SavedPage } from '../pages/saved/saved';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { MessagesPage } from '../pages/messages/messages';
import { FriendsPage } from '../pages/friends/friends';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { UpdateprofilepicPage } from '../pages/updateprofilepic/updateprofilepic';
import { PopoverComponent } from '../components/popover/popover';


const firebaseAuth = {
  apiKey: "AIzaSyDUn8OuO3b6wtnn1g78EqzRUUZJMPof8tU",
  authDomain: "atelier-842ac.firebaseapp.com",
  databaseURL: "https://atelier-842ac.firebaseio.com",
  projectId: "atelier-842ac",
  storageBucket: "atelier-842ac.appspot.com",
  messagingSenderId: "781691867947"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserUploadsPage,
    ProfilePage,
    TabsPage,
    ExplorePage,
    EditProfPage,
    NotificationsPage,
    CommentsPage,
    LoginPage,
    RegisterPage,
    AddArtPage,
    ActivityPage,
    SavedPage,
    MessagesPage,
    FriendsPage,
    UpdateprofilepicPage,
    PopoverComponent
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //AngularFireModule.initializeApp(firebaseAuth),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    UserUploadsPage,
    EditProfPage,
    TabsPage,
    ExplorePage,
    NotificationsPage,
    CommentsPage,
    LoginPage,
    RegisterPage,
    AddArtPage,
    ActivityPage,
    SavedPage,
    MessagesPage,
    FriendsPage,
    UpdateprofilepicPage,
    PopoverComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    AuthProvider,
    AngularFireAuthModule,
    AngularFireAuth,
    UserProvider,
    RequestsProvider,
    ChatProvider,
  ]
})
export class AppModule {}
