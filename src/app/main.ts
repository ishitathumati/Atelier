import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//import { ProfilePage } from '../pages/profile/profile';

import 'rxjs/add/operator/take';

platformBrowserDynamic().bootstrapModule(AppModule);


