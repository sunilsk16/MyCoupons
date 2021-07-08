import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MyrewardsComponent } from '../../myrewards/myrewards.component';
import { ModalController } from '@ionic/angular';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { RewardsService } from '../../_services/rewards/rewards.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  type: any;
  rewardsList:any;
  loggedInUser:any;
  barcodeScannerOptions: BarcodeScannerOptions;

   constructor(public popoverCtrl: PopoverController,
   public modalCtrl: ModalController,
   private barcodeScanner: BarcodeScanner,
  private rewardsService: RewardsService,) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
        if (window.localStorage.getItem('currentUser')) {
          this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
        } }

   ngOnInit() {
     this.type = 'available';
     this.rewardsService.getAllRewards()
     .then((res:any) =>{
       this.rewardsList = res;
       console.log('rewardsList ', res);
       })
     }

     async couponsView(rewardId: any) {
         const modal = await this.modalCtrl.create({
           component: MyrewardsComponent,
         componentProps: { 'data': rewardId },
           animated: true,
           mode: 'ios',
           backdropDismiss: false,
           cssClass: 'login-modal',
         })

         return await modal.present();
       }

   // async couponsView(event: any) {
   //   const popover = await this.popoverCtrl.create({
   //       component: MyrewardsComponent,
   //       event: event,
   //       animated: true,
   //       showBackdrop: true
   //   });
   //   return await popover.present();
   //      const { role } = await popover.onDidDismiss();
   // }


   segmentChanged(ev: any) {
      console.log('Segment changed', ev);
    }
 }
