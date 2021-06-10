import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { CouponService } from '../../_services/coupons/coupon.service';
import { Platform , MenuController } from '@ionic/angular';
import { AlertService } from '../../_services/alert.service';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";


@Component({
  selector: 'app-admincoupons',
  templateUrl: './admincoupons.page.html',
  styleUrls: ['./admincoupons.page.scss'],
})
export class AdmincouponsPage implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;
    errorMessage = '';
    successMessage = '';
    userList: any = [];
  roleName: any = '';
  isEdit: any = false;
  roleData: any;
  loggedInUser: any;
  couponId: any;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

    users: any = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    }


    constructor(
      private barcodeScanner: BarcodeScanner,
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
          private couponService: CouponService,
        private platform: Platform,
        private alertService: AlertService,
      public menu: MenuController) {
        this.encodeData = "https://www.FreakyJolly.com";
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
        this.registerForm = this.formBuilder.group({
            prefix: ['', Validators.required],
            description: ['', Validators.required],
            plans: ['', Validators.required],
            catgory: ['', Validators.required],
            couponId: ['', Validators.required],
        });

        this.couponService.getCouponsGenerateAutoId()
        .then((autoId: any) => {
          let couponId = 'COUP' + autoId;
          console.log('couponId ', couponId);
          this.couponId = couponId;
          this.registerForm.patchValue({
            couponId: couponId
          })
                })

    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    refreshPages() {
  }

  encodedText() {
     this.barcodeScanner
       .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
       .then(
         encodedData => {
           console.log(encodedData);
           this.encodeData = encodedData;
         },
         err => {
           console.log("Error occured : " + err);
         }
       );
   }

    createCoupons(value) {
        this.encodedText();
        let coupon: any = {};
      if (this.isEdit) {
        coupon.updated_by = this.loggedInUser;
        coupon.prefix= this.registerForm.value.prefix;
          coupon.description= this.registerForm.value.description;
          coupon.plans=this.registerForm.value.plans;
          coupon.catgory=this.registerForm.value.catgory;
          coupon.couponId=this.registerForm.value.couponId;

              // role.updated_on = moment().format('DD-MM-YYYY hh:mm A');
        // role.timeStamp = moment().format('x');
      } else {
        coupon = {
                  created_by: this.loggedInUser,
                  prefix: this.registerForm.value.prefix,
            description: this.registerForm.value.description,
            plans:this.registerForm.value.plans,
            catgory:this.registerForm.value.catgory,
            couponId:this.registerForm.value.couponId,
          // created_on: moment().format('DD-MM-YYYY hh:mm A'),
          // updated_on: moment().format('DD-MM-YYYY hh:mm A'),
          // timeStamp: moment().format('x')
        }
      }
      console.log(coupon);
      // this.helper.showLoading();
      this.couponService.createCoupons(coupon)
        .then(() => {
          return this.refreshPages();
        })
        .then(() => {
          // this.helper.hideLoading();
          let msg = this.isEdit ? 'Updated' : 'Created'
          this.alertService.showToast(' successfully');
          this.roleName = ''
        })
        .catch((err:any) => {
          // this.helper.hideLoading();
          this.alertService.showToast('Error creating Coupons');
          console.log(err);
        })
    }


}
