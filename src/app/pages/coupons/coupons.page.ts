import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MycouponsComponent } from '../../mycoupons/mycoupons.component';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { CouponService } from '../../_services/coupons/coupon.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
  type: any;
  loggedInUser: any;
  couponsList: any;
  pvalue: any;
  defaultCouponsList: any = [];
  barcodeScannerOptions: BarcodeScannerOptions;
  @Input() value: any;

  constructor(public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
    private couponService: CouponService,
    private activatedRoute: ActivatedRoute, ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    if (window.localStorage.getItem('currentUser')) {
      this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
      console.log('logginUser', this.loggedInUser);

      this.defaultCouponsList = this.loggedInUser.couponsList;
      console.log('defaultCouponsList', this.defaultCouponsList);
    }
  }


  ngOnInit() {

    this.type = 'available';
    console.log("data", this.type);

    // if(this.loggedInUser.isPrimeMember == true)
    // {
    // this.couponService.getAllCoupons()
    // .then((res:any) =>{
    //   this.couponsList = res;
    //    this.defaultBookingList = this.couponsList;
    //   console.log('couponsList ', res);
    //   })
    // }
    // else{
    //     console.log('no couponsList ');
    // }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  // async couponsView(event: any) {
  //   const popover = await this.popoverCtrl.create({
  //       component: MycouponsComponent,
  //       event: event,
  //       animated: true,
  //       showBackdrop: true
  //   });
  //   return await popover.present();
  //      const { role } = await popover.onDidDismiss();
  // }


  async couponsView(couponId: any) {
    let modal = await this.modalCtrl.create({
      component: MycouponsComponent,
      componentProps: { 'data': couponId },
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    })

    return await modal.present();
    // const modal = await this.modalCtrl.create({
    //   component: MycouponsComponent,
    //   componentProps: {
    //     'model_title': "Nomadic model's reveberation"
    //   }
    // });
  }

  getValue(event) {
    if(event && event.target) {
      this.defaultCouponsList = this.defaultCouponsList.filter(x => x.plans == event.target.value.plans)
      console.log('value',this.pvalue);

    }
  }



  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
