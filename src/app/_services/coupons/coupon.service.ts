import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  ref = firebase.firestore().collection('users');
  private couponCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    private httpService: HttpClient,
    private storage: AngularFireStorage
  )
  {
    this.couponCollection = this.afs.collection<any>('coupons', ref => ref.orderBy('created_on'));
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

  newCoupon(coupon: any) {
    return this.couponCollection.add(coupon);
  }
  updateCurrCoupon(coupon: any) {
    return this.afs.doc<any>('coupons/' + coupon.id).set(coupon);
  }

  createCoupons(coupon: any) {
    return new Promise((resolve) => {
      if (coupon.id) {
        this.updateCurrCoupon(coupon)
          .then(() => {
            resolve();
          })
      } else {
        this.newCoupon(coupon)
          .then(() => {
            resolve();
          })
      }
    })
  }

  getCouponsGenerateAutoId() {
    return new Promise((resolve) => {
      let orderNumRef = this.afs.doc<any>('settings/coupons');
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

  getAllCoupons() {
    return new Promise((resolve) => {
      this.firestore.collection('coupons').snapshotChanges()
        .subscribe(coupons => {
          let contactList = coupons.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }



getCouponsById(id: any) {
    return new Promise((resolve) => {
      var docRef = this.firestore.collection("coupons").doc(id);

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

  getCouponsBId(couponId: any) {
    return new Promise((resolve) => {
      this.firestore.collection('coupons',
        ref => ref.where('couponId', '==', parseInt(couponId))).snapshotChanges()
        .subscribe(coupons => {
          let contactList = coupons.map(item => {
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
