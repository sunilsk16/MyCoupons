import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }



  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        localStorage.removeItem('currentUser');
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
              localStorage.removeItem('currentUser');
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }

}
