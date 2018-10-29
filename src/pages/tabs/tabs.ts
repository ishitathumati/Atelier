import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FeedPage } from '../feed/feed';
import { NotificationsPage } from '../notifications/notifications';
import { ExplorePage } from '../explore/explore';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = NotificationsPage;
  tab5Root = ExplorePage;

  constructor() {

  }
}
