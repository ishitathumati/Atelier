//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user'
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()                                       
export class AuthProvider {

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  login(user: User) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
        resolve(true);
       }).catch((err) => {
         reject(err);

       })
  })

return promise;
  }
}
