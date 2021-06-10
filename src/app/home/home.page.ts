import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptsOne = {
 initialSlide: 0,
 slidesPerView: 1,
 autoplay:true
};

  constructor(public menu: MenuController) {
     this.menu.swipeGesture(true)
   }

   ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.swipeGesture(false);
  }



}
