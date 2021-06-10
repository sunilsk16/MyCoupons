import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MycouponsComponent } from '../../mycoupons/mycoupons.component';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
 type: any;
  constructor(public popoverCtrl: PopoverController,
   public modalCtrl: ModalController,) { }

  ngOnInit() {
    this.type = 'available';
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
      const modal = await this.modalCtrl.create({
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
