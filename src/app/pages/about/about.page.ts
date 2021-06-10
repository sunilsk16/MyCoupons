import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }
  slideOptsOne = {
 initialSlide: 0,
 slidesPerView: 1,
 autoplay:true
};

  ngOnInit() {
  }

}
