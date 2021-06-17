import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { AlertService } from '../_services/alert.service';
import { Platform , MenuController } from '@ionic/angular';
declare var RazorpayCheckout: any;




@Component({
  selector: 'app-mydeals',
  templateUrl: './mydeals.component.html',
  styleUrls: ['./mydeals.component.scss'],
})
export class MydealsComponent implements OnInit {
loggedInUser: any;
isLoading: any = false;
currency: string = 'INR';
razor_key = 'rzp_test_7HIzld6TnnDX0r';
paymentAmount: number = 5000;



  constructor(public modalCtrl: ModalController,
    private alertService:AlertService,
    private platform: Platform,
  public menu: MenuController) {
    if (window.localStorage.getItem('currentUser')) {
      this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
    }
  }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  buyNow() {
     let self = this;
      var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: this.currency, // your 3 letter currency code
        key: this.razor_key, // your Key Id from Razorpay dashboard
        amount: this.paymentAmount, // Payment amount in smallest denomiation e.g. cents for USD
        name: 'Deni',
        prefill: {
          email: 'deni@yopmail.com',
          contact: '9621323231',
          name: 'Deni'
        },
        theme: {
          color: '#F37254'
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

  // buyNow() {
  //   let self = this;
  //   var options = {
  //     // "key": "rzp_live_6tbesfpKT7Pld4",
  //     "key": "rzp_test_7HIzld6TnnDX0r",
  //     "amount": self.subAmt * 100, // 2000 paise = INR 20
  //     "name": "CorpCRS - Subscription",
  //     "description": "Purchasing " + self.subModel + " subscrition",
  //     "handler": function(response) {
  //       console.log(response);
  //       if (response && response.razorpay_payment_id) {
  //         // self.alertService.showSuccess('We have received your payment. Thank you so much')
  //         self.submit();
  //       }
  //     },
  //     "prefill": {
  //       "name": self.loggedInUser.firstName,
  //       "email": self.loggedInUser.email,
  //       "contact": '+91' + self.loggedInUser.phoneNumber,
  //     },
  //     "notes": {},
  //     "theme": {
  //       "color": "blue"
  //     }
  //   };
  //   var rzp1 = new Razorpay(options);
  //
  //   rzp1.open();
  //
  //   // body...
  // }
  submit(){
      // this.isLoading = true;
      // let data = {
      //   hotelId: this.currOrganization.id,
      //   hotelData: this.currOrganization,
      //   type: this.currOrganization.type,
      //   name: this.currOrganization.hotelName,
      //   UID: this.currOrganization.UID,
      //   subModel: this.subModel,
      //   subAmt: this.subAmt,
      //   startDate: this.startDate,
      //   endDate: this.endDate,
      //   addedBy: this.loggedInUser,
      //   addedOn: moment().format('DD-MM-YYYY hh:mm A'),
      //   timeStamp: moment().format('x')
      }

}
