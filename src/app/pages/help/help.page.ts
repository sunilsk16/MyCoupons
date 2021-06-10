import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
shownGroup = null;
  diseases = [
    { title: "How to Refer a Friends",
     description: "Go to Reffer pages and invite them to DENISSONS app." },
     { title: "About Prime Membership ",
      description: "Getting bounce Offers coupons For prime Members." },
    ];

  constructor() { }

  ngOnInit() {
  }
  toggleGroup(group) {
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };
}
