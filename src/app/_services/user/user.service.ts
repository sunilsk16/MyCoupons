import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ref = firebase.firestore().collection('users');
  private roleCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    private httpService: HttpClient,
    private storage: AngularFireStorage
  )
  {
    this.roleCollection = this.afs.collection<any>('rolemanagement', ref => ref.orderBy('roleName'));
  }

  generateUniqNumber(length?: any) {
    var length = length || 8,
      charset = "0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


  getAllUsers() {
    return new Promise((resolve) => {
      this.firestore.collection('users').snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  getAllAdmins() {
    return new Promise((resolve) => {
      this.firestore.collection('admins').snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }
  //
  // getCrsUsers() {
  //   return new Promise((resolve) => {
  //     this.firestore.collection('admins',
  //       ref => ref.where('organization', '==', 'CorpCRS')).snapshotChanges()
  //       .subscribe(users => {
  //         let contactList = users.map(item => {
  //           return {
  //             ...item.payload.doc.data() as {},
  //             id: item.payload.doc.id
  //           };
  //         });
  //         resolve(contactList);
  //       })
  //   })
  // }

  getUserById(uid: any) {
    return new Promise((resolve) => {
      this.firestore.collection('admins',
        ref => ref.where('uid', '==', uid)).snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  getAllRoles() {
    return new Promise((resolve) => {
      this.firestore.collection('rolemanagement').snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  fethAllRoles() {
    return new Promise((resolve) => {
      this.firestore.collection('rolemanagement').snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  getRoleById(roleValue: any) {
    return new Promise((resolve) => {
      this.firestore.collection('rolemanagement',
        ref => ref.where('roleValue', '==', parseInt(roleValue))).snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  deleteRoleById(id) {
    return this.afs.doc('rolemanagement/' + id).delete();
  }

  getCurrentUser(userId): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }

  deleteUserById(id) {
    return this.afs.doc('admins/' + id).delete();
  }

  createUser(user) {
    return this.ref.add(user);
  }

  getUserProfileById(uid: any) {
    return new Promise((resolve) => {
      this.firestore.collection('users',
        ref => ref.where('uid', '==', uid)).snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }


  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(uid: string, user: any) {
    return this.afs.doc('admins/' + uid).set(user);
  }

  getUserInfo(uid: string) {
    return this.firestore.doc(`admins/${uid}`).ref.get()
  }
  getProfileImageUrl(uid) {
    try {
      return this.storage.ref(`profileImage/${uid}`).getDownloadURL().toPromise()
    } catch (error) {
      console.log(error);
    }
  }

  getUserRole(roleValue: any) {
    return this.firestore.collection<any>('rolemanagement',
      ref => ref.where('roleValue', '==', parseInt(roleValue))).valueChanges();
  }
  updateCurrRole(role: any) {
    return this.afs.doc<any>('rolemanagement/' + role.id).set(role);
  }

  newRole(role: any) {
    return this.roleCollection.add(role);
  }

  createRole(role: any) {
    return new Promise((resolve) => {
      if (role.id) {
        this.updateCurrRole(role)
          .then(() => {
            resolve();
          })
      } else {
        this.newRole(role)
          .then(() => {
            resolve();
          })
      }
    })
  }

  getAdminById(id: any) {
      return new Promise((resolve) => {
        var docRef = this.firestore.collection("admins").doc(id);

        docRef.ref.get().then(function(doc) {
          if (doc.exists) {
            let res = { ...doc.data()  as {} , id: doc.id }
            resolve(res)
          }
        }).catch(function(error) {
          resolve(null);
        });
      })
    }

}
