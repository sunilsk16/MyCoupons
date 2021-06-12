import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  ref = firebase.firestore().collection('users');
  private dealsCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    private httpService: HttpClient,
    private storage: AngularFireStorage
  )
  {
    this.dealsCollection = this.afs.collection<any>('rewards', ref => ref.orderBy('created_on'));
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

  newRewards(reward: any) {
    return this.dealsCollection.add(reward);
  }
  updateCurrRewards(reward: any) {
    return this.afs.doc<any>('rewards/' + reward.id).set(reward);
  }

  createRewards(reward: any) {
    return new Promise((resolve) => {
      if (reward.id) {
        this.updateCurrRewards(reward)
          .then(() => {
            resolve();
          })
      } else {
        this.newRewards(reward)
          .then(() => {
            resolve();
          })
      }
    })
  }

  getRewardsGenerateAutoId() {
    return new Promise((resolve) => {
      let orderNumRef = this.afs.doc<any>('settings/Rewards');
      return orderNumRef.ref.get()
        .then(doc => {
          let val: any = 2100001;
          if (doc.exists) {
            val = (Number(doc.data().counter) + 1).toString();
          }
          orderNumRef.ref.set({
            counter: val
          })
          resolve(val);
        })
    })
  }

  getAllRewards() {
    return new Promise((resolve) => {
      this.firestore.collection('rewards').snapshotChanges()
        .subscribe(rewards => {
          let contactList = rewards.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  getRewardsById(rewardId: any) {
    return new Promise((resolve) => {
      this.firestore.collection('rewards',
        ref => ref.where('rewardId', '==', parseInt(rewardId))).snapshotChanges()
        .subscribe(rewards => {
          let contactList = rewards.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

}
