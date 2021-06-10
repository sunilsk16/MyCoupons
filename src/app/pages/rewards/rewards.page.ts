import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MyrewardsComponent } from '../../myrewards/myrewards.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  type: any;
   constructor(public popoverCtrl: PopoverController,
   public modalCtrl: ModalController) { }

   ngOnInit() {
     this.type = 'available';
     }

     async couponsView() {
         const modal = await this.modalCtrl.create({
           component: MyrewardsComponent,
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
