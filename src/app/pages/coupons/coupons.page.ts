import { Component, OnInit ,Input} from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MycouponsComponent } from '../../mycoupons/mycoupons.component';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { CouponService } from '../../_services/coupons/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
 type: any;
 loggedInUser: any;
 couponsList:any;
 barcodeScannerOptions: BarcodeScannerOptions;
  @Input() value: any;

  constructor(public popoverCtrl: PopoverController,
   public modalCtrl: ModalController,
   private barcodeScanner: BarcodeScanner,
 private couponService: CouponService,) {
   this.barcodeScannerOptions = {
     showTorchButton: true,
     showFlipCameraButton: true
   };
       if (window.localStorage.getItem('currentUser')) {
         this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
       }}

  ngOnInit() {
        this.type = 'available';
        this.couponService.getAllCoupons()
        .then((res:any) =>{
          this.couponsList = res;
          console.log('couponsList ', res);
          })
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
  async couponsView() {
      let modal = await this.modalCtrl.create({
        component: MycouponsComponent,
          animated: true,
        mode: 'ios',
        backdropDismiss: false,
        cssClass: 'login-modal',
      })

      return await modal.present();
    }


  segmentChanged(ev: any) {
     console.log('Segment changed', ev);
   }
}
