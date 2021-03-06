import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { CouponService } from '../../_services/coupons/coupon.service';
import { Platform, MenuController } from '@ionic/angular';
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
  urlImg: any;
  qrCode: null;
  createdCode: null;
  scannedCode: null;
  allPlans: any = [];
  lunchtime: any;
  planType: any;
  catgories: any = ['Lunch', 'Dinner', 'Drinks'];
  plans: any = {
    'Lunch': ["paln A", "Plan B", "Plan C", "Plan D"],
    'Dinner': ["paln A", "Plan B", "Plan C", "Plan D"],
    'Drinks': ["paln A", "Plan B", "Plan C"]
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
    this.encodeData = "hello";
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

  createCode() {
    this.createdCode = this.qrCode;
  }

  createCoupons(value) {
    // this.createCode();
    let coupon: any = {};
    if (this.isEdit) {
      coupon.updated_by = this.loggedInUser;
      coupon.prefix = this.registerForm.value.prefix;
      coupon.description = this.registerForm.value.description;
      coupon.plans = this.registerForm.value.plans;
      coupon.catgory = this.registerForm.value.catgory;
      coupon.couponId = this.registerForm.value.couponId;

      // role.updated_on = moment().format('DD-MM-YYYY hh:mm A');
      // role.timeStamp = moment().format('x');
    } else {
      coupon = {
        created_by: this.loggedInUser,
        prefix: this.registerForm.value.prefix,
        description: this.registerForm.value.description,
        plans: this.registerForm.value.plans,
        catgory: this.registerForm.value.catgory,
        couponId: this.registerForm.value.couponId,
        time: this.lunchtime,
        plantype: this.planType,
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
      .catch((err: any) => {
        // this.helper.hideLoading();
        this.alertService.showToast('Error creating Coupons');
        console.log(err);
      })
  }

  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
    if (selectedValue.detail.value == "Lunch") {
this.lunchtime="11:30:pm to 03:00:pm";
      console.log('Selected', "11:30:pm to 03:00:pm");
    }
    else if (selectedValue.detail.value == "Dinner") {
      this.lunchtime="08:30:pm to 11:00:pm";
      console.log('Selected', "08:30:pm to 11:00:pm");
    }
    else {
      this.lunchtime="08:30:pm to 11:00:pm";
      console.log('Selected', "Crazy Hours");
    }
    this.onStateChange();
  }

  onStateChange() {
    this.allPlans = this.plans[this.registerForm.value.catgory];
    console.log('Selected', this.allPlans);
  }

  onSelectChangeTwo(selectedValue: any) {

    if (selectedValue.detail.value == "Plan A") {
  this.planType="Starter / Soup Offer -";
    }
    else if (selectedValue.detail.value == "Plan B") {
    this.planType="Main Course Offer -";
    }
    else if (selectedValue.detail.value == "Plan C") {
    this.planType="Dessert / Mocktails Offer -";
    }
    else {
      this.planType="Pizza / pasta /Sizzler Offer -";
    }
    }

}
