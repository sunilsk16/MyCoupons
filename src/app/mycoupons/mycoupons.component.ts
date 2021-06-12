import { Component, OnInit } from '@angular/core';
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
  barcodeScannerOptions: BarcodeScannerOptions;
    title = 'app';
    elementType = 'url';
    value : any;

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
      }

   }

  ngOnInit() {
        this.couponService.getAllCoupons()
    .then((res:any) =>{
      this.couponsList = res;
      this.value=res[0].couponId;
      console.log('couponsList ', res);
      console.log('couponsList ', res[0].couponId);
      })
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
