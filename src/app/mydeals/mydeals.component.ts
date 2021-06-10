import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-mydeals',
  templateUrl: './mydeals.component.html',
  styleUrls: ['./mydeals.component.scss'],
})
export class MydealsComponent implements OnInit {
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
