import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MydealsComponent } from '../../mydeals/mydeals.component';
import { BuydealsComponent } from '../../buydeals/buydeals.component';
import { ModalController } from '@ionic/angular';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { DealsService } from '../../_services/deals/deals.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
dealList: any;
loggedInUser: any;
defaultCouponsList: any;
pvalue: any;
barcodeScannerOptions: BarcodeScannerOptions;
  type: any;
  constructor(public popoverCtrl: PopoverController,
   public modalCtrl: ModalController,
   private barcodeScanner: BarcodeScanner,
 private dealsService: DealsService,) {
   this.barcodeScannerOptions = {
     showTorchButton: true,
     showFlipCameraButton: true
   };
       if (window.localStorage.getItem('currentUser')) {
         this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
       }
     }


   ngOnInit() {
     this.type = 'available';
     this.dealsService.getAllDeals()
     .then((res:any) =>{
       this.dealList = res;
       console.log('dealList ', res);
       })


       }
   // async dealsView(event: any) {
   //   const popover = await this.popoverCtrl.create({
   //       component: MydealsComponent,
   //       event: event,
   //       animated: true,
   //       showBackdrop: true
   //
   //   });
   //   return await popover.present();
   //      const { role } = await popover.onDidDismiss();
   // }
   // async buyDealsView(event: any) {
   //   const popover = await this.popoverCtrl.create({
   //       component: BuydealsComponent,
   //       event: event,
   //       animated: true,
   //       showBackdrop: true,
   //       translucent: true,
   //
   //       // backdropDismiss: false
   //
   //   });
   //   return await popover.present();
   //      const { role } = await popover.onDidDismiss();
   // }

   async dealsView(dealId: any) {
       const modal = await this.modalCtrl.create({
         component: MydealsComponent,
         componentProps: { 'data': dealId },
         animated: true,
         mode: 'ios',
         backdropDismiss: false,
         cssClass: 'login-modal',
       })

       return await modal.present();
     }

     async buyDealsView(dealId: any) {
         const modal = await this.modalCtrl.create({
           component: BuydealsComponent,
            componentProps: { 'data': dealId },
           animated: true,
           mode: 'ios',
           backdropDismiss: false,
           cssClass: 'login-modal',
         })

         return await modal.present();
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
