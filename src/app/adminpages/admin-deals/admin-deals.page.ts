import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { DealsService } from '../../_services/deals/deals.service';
import { Platform, MenuController } from '@ionic/angular';
import { AlertService } from '../../_services/alert.service';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-admin-deals',
  templateUrl: './admin-deals.page.html',
  styleUrls: ['./admin-deals.page.scss'],
})
export class AdminDealsPage implements OnInit {
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
  dealId: any;
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
    private dealsService: DealsService,
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
      dealId: ['', Validators.required],
    });


    this.dealsService.getDealsGenerateAutoId()
      .then((autoId: any) => {
        let dealId = 'COUP' + autoId;
        console.log('dealId ', dealId);
        this.dealId = dealId;
        this.registerForm.patchValue({
          dealId: dealId
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
    let deal: any = {};
    if (this.isEdit) {
      deal.updated_by = this.loggedInUser;
      deal.prefix = this.registerForm.value.prefix;
      deal.description = this.registerForm.value.description;
      deal.plans = this.registerForm.value.plans;
      deal.catgory = this.registerForm.value.catgory;
      deal.dealId = this.registerForm.value.dealId;

      // role.updated_on = moment().format('DD-MM-YYYY hh:mm A');
      // role.timeStamp = moment().format('x');
    } else {
      deal = {
        created_by: this.loggedInUser,
        prefix: this.registerForm.value.prefix,
        description: this.registerForm.value.description,
        plans: this.registerForm.value.plans,
        catgory: this.registerForm.value.catgory,
        dealId: this.registerForm.value.dealId,
        time: this.lunchtime,
        plantype: this.planType,
        // created_on: moment().format('DD-MM-YYYY hh:mm A'),
        // updated_on: moment().format('DD-MM-YYYY hh:mm A'),
        // timeStamp: moment().format('x')
      }
    }
    console.log(deal);
    // this.helper.showLoading();
    this.dealsService.createDeals(deal)
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
        this.alertService.showToast('Error creating Deals');
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
