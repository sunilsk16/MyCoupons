import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MydealsComponent } from '../../mydeals/mydeals.component';
import { BuydealsComponent } from '../../buydeals/buydeals.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {

  type: any;
   constructor(public popoverCtrl: PopoverController,
    public modalCtrl: ModalController) { }

   ngOnInit() {
     this.type = 'available';


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

   async dealsView() {
       const modal = await this.modalCtrl.create({
         component: MydealsComponent,
         animated: true,
         mode: 'ios',
         backdropDismiss: false,
         cssClass: 'login-modal',
       })

       return await modal.present();
     }

     async buyDealsView() {
         const modal = await this.modalCtrl.create({
           component: BuydealsComponent,
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
