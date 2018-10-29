import { Component } from '@angular/core';

<<<<<<< HEAD

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { UserUploadsPage } from '../user-uploads/user-uploads';
import { ExplorePage } from '../explore/explore';
import { NotificationsPage } from '../notifications/notifications';

=======
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FeedPage } from '../feed/feed';
import { NotificationsPage } from '../notifications/notifications';
import { ExplorePage } from '../explore/explore';
>>>>>>> mbarigala

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

<<<<<<< HEAD
  tab1Root = HomePage;
  tab2Root = UserUploadsPage
  tab3Root = ProfilePage;
  tab4Root = NotificationsPage
  tab5Root = ExplorePage;

=======
  tab1Root = FeedPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = NotificationsPage;
  tab5Root = ExplorePage;
>>>>>>> mbarigala

  constructor() {

  }
}
