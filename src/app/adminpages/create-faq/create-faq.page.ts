import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.page.html',
  styleUrls: ['./create-faq.page.scss'],
})
export class CreateFaqPage implements OnInit {
  faqData: any = {
    title: '',
    content: '',
    isSelected: false,
    viewTo: 'All'
  }
  loggedInUser: any;
  isLoading: any = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,

  ) {
    if (window.localStorage.getItem('currentUser'))
     {
      this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
    }
   }

  ngOnInit() {
  }

  submit() {
    console.log('am in create faq ', this.faqData);
    if (!this.faqData.title || !this.faqData.content) {
      this.alertService.showToast('Enter manadatory fields !!');
      return false;
    }
    this.isLoading = true;
    let data = {
      ...this.faqData,
      createdBy: this.loggedInUser,
      // createdAt: moment().format('x'),
      // createdOn: moment().format('DD-MM-YYYY hh:mm A')
    }
    this.userService.addFaq(data)
      .then(() => {
        this.isLoading = false;
        this.alertService.showToast('Faq created successfully !!');
        this.faqData = {
          viewTo: 'All',
          title: '',
          content: ''
        }
      })
      .catch(() => {
        this.isLoading = false;
      })
  }

}
