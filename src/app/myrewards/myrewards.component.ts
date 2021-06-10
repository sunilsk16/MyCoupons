import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';


@Component({
  selector: 'app-myrewards',
  templateUrl: './myrewards.component.html',
  styleUrls: ['./myrewards.component.scss'],
})
export class MyrewardsComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }


}
