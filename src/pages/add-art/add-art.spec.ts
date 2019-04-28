//Unit testing 
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AddArtPage } from '../add-art/add-art'; //component that is being tested
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

describe('Add Art Page', () => {
    let de: DebugElement;
    let comp: AddArtPage;
    let fixture: ComponentFixture<AddArtPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [AddArtPage],
          imports: [
            IonicModule.forRoot(AddArtPage)
          ],
          providers: [
            NavController,
            AngularFireDatabase,
            Camera,
            UserProvider,
            AngularFireAuth
          ]
        });
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(AddArtPage);
        comp = fixture.componentInstance;
      });
    

      it('should be created', () => {
        expect(comp instanceof AddArtPage).toBe(true);
      });


});


