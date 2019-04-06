//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera'
import {UserProvider} from '../user/user';
import { AngularFireAuth } from 'angularfire2/auth';



/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {

  profilepic:any;
  firestore = firebase.storage().ref(`profilePics/`);
  uid = this.aAuth.auth.currentUser.uid;
  photo:any;

  constructor(public aAuth:AngularFireAuth,public userservice: UserProvider, private camera:Camera) {
    //console.log('Hello ImghandlerProvider Provider');
  }

  /*async takePic(){

    var promise = new Promise((resolve, reject)=>{
        const userid = this.aAuth.auth.currentUser.uid;
        const options: CameraOptions = {
          quality: 70,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
        }
    
        const result = this.camera.getPicture(options);
    
        const image =`${result}`;
        //const pictures = storage().ref();
        this.firestore.child(`${userid}/img`)
                .putString(image.substring(23), 'base64');
    
        this.camera.getPicture(options).then((imageData)=>{
        this.photo = imageData;
        this.uploadPhoto(userid).then((url)=>{
          resolve(url);
        }).catch((e)=>{
          reject(e);
        })
      }).catch((e)=>{
        reject(e);
      }) 
    })
    return promise;
}

choosefromGallery(){
  var promise = new Promise((resolve,reject)=>{
  const userid = this.aAuth.auth.currentUser.uid;
  const options: CameraOptions =
  {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 70,
  }
  this.camera.getPicture(options).then((imageData) => 
  {
     this.photo = imageData;
     this.uploadPhoto(userid).then((url)=>{
      resolve(url);
     }).catch((e)=>{
       reject(e);
     })
  }).catch((e)=>{
    reject(e);
  })
  })
  return promise;
}

private uploadPhoto(uid: string) {
  let x = this.firestore.child(`${uid}/img`)
     //imageData is either a base64 encoded string or a file URI
    x.putString(this.photo, 'base64', {contentType: 'image/jpeg'})
      .catch((err) => {
        console.log(err);
        console.log('Cant upload photo');
      }).then(()=>{x.getDownloadURL()
        .then((url)=>{
          this.profilepic = url;
        })
    //const pictures = storage().ref();
  })
  return this.profilepic;
}*/

makeblob(path){
  return fetch(path).then((response)=>{
    return response.blob();
  }).then((_blob)=>{
    return _blob;
  })
}

takePic(){

  var promise = new Promise((resolve, reject)=>{
    //  const userid = this.aAuth.auth.currentUser.uid;
      this.camera.getPicture({
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }).then((path)=>{
        console.log(path);
        return this.makeblob(path);
      }).then((_blob)=>{
        console.log('path: ',_blob);
        this.uploadPhoto(_blob);
      }).then(()=>{
        let x = this.firestore.child(`${this.uid}/img`)
          .getDownloadURL().then((url) => {
            resolve(url);
          }).catch((e)=>{
            reject(e);
          })
      }).catch((e)=>{
        reject(e);
      })
      })
      return promise;
    }
  
      //const result = this.camera.getPicture(options);
  
      //const image =`${result}`;
      //const pictures = storage().ref();
      /*this.firestore.child(`${userid}/img`)
              .putString(image.substring(23), 'base64');
  
      this.camera.getPicture(options).then((imageData)=>{
      this.photo = imageData;
      this.uploadPhoto(userid).then((url)=>{
        resolve(url);
      }).catch((e)=>{
        reject(e);
      })
    }).catch((e)=>{
      reject(e);
    }) 
  })
  return promise;
}*/

choosefromGallery(){
  var promise = new Promise((resolve, reject)=>{
    //  const userid = this.aAuth.auth.currentUser.uid;
      this.camera.getPicture({
        quality: 70,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }).then((path)=>{
        console.log(path);
        return this.makeblob(path);
      }).then((_blob)=>{
        console.log('path: ',_blob);
        this.uploadPhoto(_blob);
      }).then(()=>{
        let x = this.firestore.child(`${this.uid}/img`)
          .getDownloadURL().then((url) => {
            resolve(url);
          }).catch((e)=>{
            reject(e);
          })
      }).catch((e)=>{
        reject(e);
      })
      })
      return promise;
    }

uploadPhoto(_blob) {
//var promise = new Promise((resolve,reject)=>{
  let x = this.firestore.child(`${this.uid}/img`)
  //imageData is either a base64 encoded string or a file URI
    x.put(_blob)
   .catch((err) => {
     console.log(err);
     console.log('Cant upload photo');
   })
}

}
