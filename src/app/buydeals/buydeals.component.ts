import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-buydeals',
  templateUrl: './buydeals.component.html',
  styleUrls: ['./buydeals.component.scss'],
})
export class BuydealsComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
