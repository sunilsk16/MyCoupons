import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { Platform , MenuController } from '@ionic/angular';
import { HelperService } from '../../_services/helper/helper.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  registerForm: FormGroup;
  isLoading: any = false;
    loading = false;
    submitted = false;
    errorMessage = '';
    successMessage = '';
loggedInUser:any;
    users: any = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private platform: Platform,
          private helper: HelperService,
          private alertService: AlertService,
      public menu: MenuController) {
        if (window.localStorage.getItem('currentUser')) {
    this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
  }
      this.menu.swipeGesture(false) }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

//SignUp Function
    tryRegister(value) {
      this.authService.createUser({ email: this.registerForm.value.email,password: this.registerForm.value.password})
      .then((authData: any) => {
        return this.userService.updateUser(authData.user.uid, {
          uid: authData.user.uid,
           // tenantId: this.currOrganization.tenantId,
           email: authData.user.email,
           firstName: this.registerForm.value.firstName,
           phoneNumber: this.registerForm.value.phoneNumber,
           roleValue: '1133',
           isActive: true,
           isPrimeMember:false,
           mailVerified: true,
        })
      })
      .then(() => {
        return this.sendEmail();
      })
      .then(() => {
        this.isLoading = false;
        this.registerForm.reset();
        this.alertService.showToast('User added successfully !!');
      })
      .catch((err: any) => {
        console.log('err ', err);
        this.isLoading = false;
        if(err && err.code.includes('already-in-use')){
          this.alertService.showToast('User already exists !');
        } else {
          this.alertService.showToast('Error sending invitation !!');
        }
      })
  }

  sendEmail() {
    return new Promise((resolve) => {
      let subject = '[NOTICE] You are Invited | CorpCRS.';

      let body = "<div style='border:1.1px solid #efefef;padding:5px'>" +
        "<div style='margin:-5px;text-align:center;border-bottom:1.1px solid#efefef;'>" +
        "<img style='height:70px;width:auto' src='https://stg-corpcrs.web.app/assets/images/logo/logo.png'/>" +
        "</div><div style='padding:10px 5px'>" +
        "Hello " + this.registerForm.value.firstName + " " + this.registerForm.value.phoneNumber + " ,<br/><br/>" +
        "You have been invited by " + this.loggedInUser.name + " to CorpCRS application." +
        "<br/><br/>Click below link to accept invitation and login with temporary password.<br/><br/>" +
        "Username : " + this.registerForm.value.email +
        "<br/>Password: " + '123456' +
        "<br/><br/><br/><br/>" +
        "<a href='https://stg-corpcrs.web.app' style='text-decoration:none;padding:10px 10px 10px 12px;border:0;font-family:roboto,sans-serif;font-weight:500;text-transform:none;letter-spacing:0.25px;border-radius:8px;background-color:#039be5;color:#ffffff' target='_blank'>Accept pending <span class='il'>invitation</span></a>" +
        "<br/></div><br/>Regards,<br/>CorpCRS Support Team<br/><br/>" +
        "<div style='margin:-5px;background:#78909c;padding:20px;color:white'>" +
        "CorpCRS<span style='float:right;font-size:12px'>CorpCRS Solutions Pvt Ltd" +
        "<br/>Banglore,Karnataka</span></div></div>";

      let toAddress = "firozss31@gmail.com";

      this.helper.sendEmail(subject, body,this.registerForm.value.email)
        .then((res: any) => {
          console.log('res ', res);
          resolve();
        })
        .catch((err: any) => {
          console.log('err ', err);
          resolve();
        })
    })
  }


}
