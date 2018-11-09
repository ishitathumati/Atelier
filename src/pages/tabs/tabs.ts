import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NotificationsPage } from '../notifications/notifications';
import { ExplorePage } from '../explore/explore';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserUploadsPage;
  tab3Root = ProfilePage;
  tab4Root = NotificationsPage
  tab5Root = ExplorePage;


  constructor() {

  }
}
