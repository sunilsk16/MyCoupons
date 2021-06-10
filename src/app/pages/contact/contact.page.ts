import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
showDetails: boolean= false;
  constructor() { }

  ngOnInit() {
  }
  public toggleView(item){
      item.showMore = !item.showMore
}

}
