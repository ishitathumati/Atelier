import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { ExplorePage } from '../explore/explore';
import { NotificationsPage } from '../notifications/notifications';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserUploadsPage
  tab3Root = ProfilePage;
  tab4Root = NotificationsPage
  tab5Root = ExplorePage;


  constructor() {

  }
}
