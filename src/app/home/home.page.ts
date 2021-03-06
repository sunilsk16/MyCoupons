import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user/user.service';
import { CouponService } from '../_services/coupons/coupon.service';
declare var RazorpayCheckout: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currency: string = 'INR';
  razor_key = 'rzp_test_7HIzld6TnnDX0r';
  paymentAmount: number = 5000;
  isLoading: any= false;
  userData: any;
  loggedInUser: any;
  defaultBookingList: any = [];
  couponsList:any;

  slideOptsOne = {
 initialSlide: 0,
 slidesPerView: 1,
 autoplay:true
};

  constructor(public menu: MenuController,
    private alertService:AlertService,
private userService: UserService,
private couponService: CouponService
) {
  if (window.localStorage.getItem('currentUser')) {
    this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
  }
     this.menu.swipeGesture(true)
   }

   ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.swipeGesture(false);
  }

    ngOnInit() {
      this.couponService.getAllCoupons()
      .then((res:any) =>{
        this.couponsList = res;
         this.defaultBookingList = this.couponsList;
        console.log('couponsList ', res);
        })
      }

  payNow() {
     let self = this;
      var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: this.currency, // your 3 letter currency code
        key: this.razor_key, // your Key Id from Razorpay dashboard
        amount: this.paymentAmount, // Payment amount in smallest denomiation e.g. cents for USD
        name: 'Denisson',
        prefill: {
          email: 'deni@yopmail.com',
          contact: '8095415688',
          name: 'sunil'
        },
        theme: {
          color: 'Blue'
        },
        modal: {
          ondismiss: function () {
            alert('dismissed')
          }
        }
      };

      var successCallback = function (payment_id) {
        self.alertService.showToast('We have received your payment. Thank you so much');
        self.submit();

        alert('payment_id: ' + payment_id);
      };

      var cancelCallback = function (error) {
        alert(error.description + ' (Error ' + error.code + ')');
      };

      RazorpayCheckout.open(options, successCallback, cancelCallback);
    }


      submit() {
          this.isLoading = true;
        let data = {
          ...this.loggedInUser,
          isPrimeMember: true,
          couponsList:this.defaultBookingList ,
          status: 'confirmed',
        }
        console.log('before updateGroup ', data);
        this.userService.updateUser(this.loggedInUser.uid,data)
          .then(() => {
            this.isLoading = false;
            this.alertService.showToast('Payment done successfully !!')
            // this.router.navigate(['/coupons'])
          })
            .catch((err: any) => {
            console.log('err ', err);
            this.isLoading = false;
            this.alertService.showToast('Problem occurred !!');
          })
      }

}
