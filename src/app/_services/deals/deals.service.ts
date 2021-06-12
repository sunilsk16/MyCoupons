import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  ref = firebase.firestore().collection('users');
  private dealsCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    private httpService: HttpClient,
    private storage: AngularFireStorage
  )
  {
    this.dealsCollection = this.afs.collection<any>('deals', ref => ref.orderBy('created_on'));
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

  newDeal(deal: any) {
    return this.dealsCollection.add(deal);
  }
  updateCurrDeal(deal: any) {
    return this.afs.doc<any>('deals/' + deal.id).set(deal);
  }

  createDeals(deal: any) {
    return new Promise((resolve) => {
      if (deal.id) {
        this.updateCurrDeal(deal)
          .then(() => {
            resolve();
          })
      } else {
        this.newDeal(deal)
          .then(() => {
            resolve();
          })
      }
    })
  }

  getDealsGenerateAutoId() {
    return new Promise((resolve) => {
      let orderNumRef = this.afs.doc<any>('settings/deals');
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

  getAllDeals() {
    return new Promise((resolve) => {
      this.firestore.collection('deals').snapshotChanges()
        .subscribe(deals => {
          let contactList = deals.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

  getDealsById(dealId: any) {
    return new Promise((resolve) => {
      this.firestore.collection('deals',
        ref => ref.where('dealId', '==', parseInt(dealId))).snapshotChanges()
        .subscribe(deals => {
          let contactList = deals.map(item => {
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
