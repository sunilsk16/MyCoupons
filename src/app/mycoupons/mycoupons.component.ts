import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-mycoupons',
  templateUrl: './mycoupons.component.html',
  styleUrls: ['./mycoupons.component.scss'],
})
export class MycouponsComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
