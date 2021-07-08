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
import { DealsService } from '../_services/deals/deals.service';
import { RewardsService } from '../_services/rewards/rewards.service';
import * as _ from 'underscore';
declare var RazorpayCheckout: any;


@Component({
  selector: 'app-myrewards',
  templateUrl: './myrewards.component.html',
  styleUrls: ['./myrewards.component.scss'],
})
export class MyrewardsComponent implements OnInit {

  rewardsList:any;
      loading = false;
      submitted = false;
      errorMessage = '';
      successMessage = '';
    roleName: any = '';
    loggedInUser: any;
    couponId: any;
    defaultRewardsList: any;
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
            private rewardsService: RewardsService,
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


    }
     }

    ngOnInit() {
      console.log('data ', this.data)
  this.rewardsService.getAllRewards()
  .then((res:any) =>{
    this.rewardsList = _.filter(res,{'id': this.data})
    console.log('rewardsListhhhh ', res);
    })

  console.log('data ', this.data)
this.defaultRewardsList = _.filter(this.rewardsList,{'id': this.data})
console.log('rewardsList ', this.defaultRewardsList);
this.value=[this.defaultRewardsList[0].id,this.defaultRewardsList[0].rewardId,this.defaultRewardsList[0].isActive];


    }

    dismiss() {
      this.modalCtrl.dismiss();
    }

  }
