webpackJsonp([11],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/home/home.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  Welcome to the Home Page of Atelier!\n  More to come soon.\n\n</ion-content>\n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/notifications/notifications.html"*/'<!--\n  Generated template for the NotificationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Notifications</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <div padding>\n      <ion-segment [(ngModel)]="Notifications">\n        <ion-segment-button value="Messages">\n          Messages\n        </ion-segment-button>\n        <ion-segment-button value="Comments">\n          Comments\n        </ion-segment-button>\n        <ion-segment-button value="Likes">\n          Likes\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n\n    <div [ngSwitch]="Notifications">\n      <ion-list *ngSwitchCase="\'Messages\'">\n        <ion-item>\n          <ion-thumbnail item-start>\n            <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n          </ion-thumbnail>\n          <h2>Jamaia</h2>\n          <p>Boy that last pic was ugly</p>\n        </ion-item>\n        <ion-item>\n            <ion-thumbnail item-start>\n              <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n            </ion-thumbnail>\n            <h2>Jaquan</h2>\n            <p>You\'re trash</p>\n          </ion-item>\n          <ion-item>\n              <ion-thumbnail item-start>\n                <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n              </ion-thumbnail>\n              <h2>Jaquan</h2>\n              <p>Aye that\'s lit</p>\n            </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'Comments\'">\n        <ion-item>\n          <ion-thumbnail item-start>\n            <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n          </ion-thumbnail>\n          <h2>John</h2>\n        </ion-item>\n        <ion-item>\n            <ion-thumbnail item-start>\n              <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n            </ion-thumbnail>\n            <h2>Jaquan</h2>\n          </ion-item>\n          <ion-item>\n              <ion-thumbnail item-start>\n                <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n              </ion-thumbnail>\n              <h2>Jaquan</h2>\n            </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'Likes\'">\n          <ion-item>\n            <ion-thumbnail item-start>\n              <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n            </ion-thumbnail>\n            <h2>Jaquan</h2>\n          </ion-item>\n          <ion-item>\n              <ion-thumbnail item-start>\n                <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n              </ion-thumbnail>\n              <h2>Jaquan</h2>\n            </ion-item>\n            <ion-item>\n                <ion-thumbnail item-start>\n                  <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n                </ion-thumbnail>\n                <h2>Jaquan</h2>\n              </ion-item>\n              <ion-item>\n                  <ion-thumbnail item-start>\n                    <img src="http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/10/the-man-in-the-high-castle-season-3-episode-8-cary-hiroyuki-tagawa-tagomi-amazon.jpg?itok=uUbADoii">\n                  </ion-thumbnail>\n                  <h2>Jaquan</h2>\n                </ion-item>\n      </ion-list>\n\n    </div>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/notifications/notifications.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only color="dark" menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>Profile</ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only color="dark">\n          <ion-icon name="mail"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img width="100" height="150" src="assets/imgs/user-downloadfemale-user-icon.png" alt="Sarah Knight">\n</ion-content>\n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserUploadsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the UserUploadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserUploadsPage = /** @class */ (function () {
    function UserUploadsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    UserUploadsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserUploadsPage');
    };
    UserUploadsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-uploads',template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/user-uploads/user-uploads.html"*/'<!--\n  Generated template for the UserUploadsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>User Uploads</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n    <div class = "box">\n        Jane Doe \n        <p>Portfolio: Seasons</p>\n      </div>\n      \n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n              <ion-card>\n                  <img src="assets/imgs/flower.png"/>\n                  <ion-card-content>\n                    <ion-card-title>\n                      Spring\n                      </ion-card-title>\n                    <p>\n                      $49 <ion-icon name="heart"></ion-icon>\n                    </p>\n                  </ion-card-content>\n                </ion-card>\n          </ion-col>\n          <ion-col col-6>\n              <ion-card>\n                  <img src="assets/imgs/painting.png"/>\n                  <ion-card-content>\n                    <ion-card-title>\n                      Autumn\n                      </ion-card-title>\n                    <p>\n                      $49 <ion-icon name="heart"></ion-icon>\n                    </p>\n                  </ion-card-content>\n                </ion-card>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-6>\n                <ion-card>\n                    <img src="assets/imgs/winter.png"/>\n                    <ion-card-content>\n                      <ion-card-title>\n                        Winter\n                        </ion-card-title>\n                      <p>\n                        $49  <ion-icon name="heart" color="#eca72c"></ion-icon>\n                      </p>\n                    </ion-card-content>\n                  </ion-card>\n            </ion-col>\n            <ion-col col-6>\n                <ion-card>\n                    <img src="assets/imgs/summer.png"/>\n                    <ion-card-content>\n                      <ion-card-title>\n                        Summer\n                        </ion-card-title>\n                      <p>\n                        $49 <ion-icon name="heart"></ion-icon>\n                      </p>\n                    </ion-card-content>\n                  </ion-card>\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/user-uploads/user-uploads.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], UserUploadsPage);
    return UserUploadsPage;
}());

//# sourceMappingURL=user-uploads.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/activity/activity.module": [
		274,
		4
	],
	"../pages/edit-prof/edit-prof.module": [
		275,
		10
	],
	"../pages/explore/explore.module": [
		276,
		9
	],
	"../pages/helpand-supp/helpand-supp.module": [
		277,
		3
	],
	"../pages/home/home.module": [
		278,
		8
	],
	"../pages/log-out/log-out.module": [
		279,
		2
	],
	"../pages/notifications/notifications.module": [
		280,
		7
	],
	"../pages/profile/profile.module": [
		281,
		6
	],
	"../pages/saved/saved.module": [
		282,
		1
	],
	"../pages/settings/settings.module": [
		283,
		0
	],
	"../pages/user-uploads/user-uploads.module": [
		284,
		5
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_uploads_user_uploads__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__explore_explore__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__user_uploads_user_uploads__["a" /* UserUploadsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_4__explore_explore__["a" /* ExplorePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="UserUploads" tabIcon="apps"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="person"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Notifications" tabIcon="notifications"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="Explore" tabIcon="search"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the EditProfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditProfPage = /** @class */ (function () {
    function EditProfPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EditProfPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditProfPage');
    };
    EditProfPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-prof',template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/edit-prof/edit-prof.html"*/'<!--\n  Generated template for the EditProfPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>EditProf</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/edit-prof/edit-prof.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], EditProfPage);
    return EditProfPage;
}());

//# sourceMappingURL=edit-prof.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_user_uploads_user_uploads__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_explore_explore__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_edit_prof_edit_prof__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_user_uploads_user_uploads__["a" /* UserUploadsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_explore_explore__["a" /* ExplorePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_edit_prof_edit_prof__["a" /* EditProfPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/activity/activity.module#ActivityPageModule', name: 'ActivityPage', segment: 'activity', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-prof/edit-prof.module#EditProfPageModule', name: 'EditProfPage', segment: 'edit-prof', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/explore/explore.module#ExplorePageModule', name: 'ExplorePage', segment: 'explore', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/helpand-supp/helpand-supp.module#HelpandSuppPageModule', name: 'HelpandSuppPage', segment: 'helpand-supp', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/log-out/log-out.module#LogOutPageModule', name: 'LogOutPage', segment: 'log-out', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/saved/saved.module#SavedPageModule', name: 'SavedPage', segment: 'saved', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-uploads/user-uploads.module#UserUploadsPageModule', name: 'UserUploadsPage', segment: 'user-uploads', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_user_uploads_user_uploads__["a" /* UserUploadsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_explore_explore__["a" /* ExplorePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_edit_prof_edit_prof__["a" /* EditProfPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/app/app.html"*/'<ion-menu [content]="content">\n        <ion-header>\n          <ion-toolbar>\n            <ion-title>User</ion-title>\n          </ion-toolbar>\n        </ion-header>\n\n        <ion-footer>\n         <ion-toolbar>\n            <ion-list>\n             <button ion-item (click)="LoadPage()">\n             <ion-icon name="settings"></ion-icon>\n               Settings\n             </button>\n             <button ion-item (click)="openPage(friendsPage)">\n             <ion-icon name="help-circle"></ion-icon>\n                Help and Support\n             </button>\n            </ion-list>\n             <button ion-button icon color="dark" clear (click)="closeMenu()">\n             <ion-icon name="exit"></ion-icon>\n                Log Out\n             </button>\n            \n        </ion-toolbar>\n        </ion-footer>\n        <ion-content>\n          <ion-list>\n            <button ion-item (click)="openPage(friendsPage)">\n                <ion-icon name="create"></ion-icon>\n                Edit Profile\n            </button>\n            <button ion-item (click)="openPage(friendsPage)">\n                <ion-icon name="clock"></ion-icon>\n                Activity\n            </button>\n            <button ion-item (click)="openPage(eventsPage)">\n                <ion-icon name="archive"></ion-icon>\n                Saved\n            </button>\n          </ion-list>\n        </ion-content>\n      </ion-menu>\n      \n      <ion-nav id="nav" #content [root]="rootPage"></ion-nav>\n      \n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExplorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExplorePage = /** @class */ (function () {
    function ExplorePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ExplorePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExplorePage');
    };
    ExplorePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-explore',template:/*ion-inline-start:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/explore/explore.html"*/'<!--\n  Generated template for the ExplorePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Explore</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n \n          \n\n</ion-content>\n\n  \n  \n\n'/*ion-inline-end:"/Users/saipriyasairam/Desktop/Capstone/art/Atelier/src/pages/explore/explore.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ExplorePage);
    return ExplorePage;
}());

//# sourceMappingURL=explore.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map