import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user/user.service';
import { CouponService } from '../_services/coupons/coupon.service';
import { Platform , MenuController } from '@ionic/angular';
import { AlertService } from '../_services/alert.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-mycoupons',
  templateUrl: './mycoupons.component.html',
  styleUrls: ['./mycoupons.component.scss'],
})
export class MycouponsComponent implements OnInit {
couponsList:any;
    loading = false;
    submitted = false;
    errorMessage = '';
    successMessage = '';
  roleName: any = '';
  loggedInUser: any;
  couponId: any;
  defaultCouponsList: any;
  barcodeScannerOptions: BarcodeScannerOptions;
    title = 'app';
    elementType = 'url';
    private value: Array<any> = [];
    cId: any;

    @Input() data: any ;


  constructor(public modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
      private router: Router,
      private authService: AuthService,
      private userService: UserService,
        private couponService: CouponService,
      private platform: Platform,
      private alertService: AlertService,
    public menu: MenuController) {
      //Options
  this.barcodeScannerOptions = {
    showTorchButton: true,
    showFlipCameraButton: true
  };
  if (window.localStorage.getItem('currentUser')) {
    this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log('logginUser', this.loggedInUser);

    this.couponsList = this.loggedInUser.deali;
    console.log('defaultCouponsList', this.couponsList);
  }
   }

  ngOnInit() {
    console.log('data ', this.data)
    //     this.couponService.getCouponsById(this.data)
    // .then((res:any) =>{
    //   this.couponsList = res;
    //   this.value=[this.couponsList.id ,this.couponsList.couponId,this.loggedInUser.id];
    //
    //   console.log('couponsList ', res);
    //   console.log('couponsList ', this.data);
    //   })

this.defaultCouponsList = _.filter(this.couponsList,{'id': this.data})
console.log('couponsList ', this.defaultCouponsList);
this.value=[this.defaultCouponsList[0].id,this.defaultCouponsList[0].couponId,this.defaultCouponsList[0].isActive];


  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
