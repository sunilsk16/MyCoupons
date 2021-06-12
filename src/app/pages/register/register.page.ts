import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { Platform , MenuController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
    loading = false;
    submitted = false;
    errorMessage = '';
    successMessage = '';

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
      public menu: MenuController) {
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
      this.authService.createUser({ email: this.registerForm.value.email, password: this.registerForm.value.password })
      .then((authData: any) => {
        return this.userService.updateUser(authData.user.uid, {
          uid: authData.user.uid,
          // tenantId: this.currOrganization.tenantId,
          email: authData.user.email,
          firstName: this.registerForm.value.firstName,
          phoneNumber: this.registerForm.value.phoneNumber,
          roleValue: '1133',
          isActive: true,
          mailVerified: true,
                })
                .then(res => {
                   console.log(res);
                  this.errorMessage = "";
                   this.successMessage = "Your account has been created. Please log in.";
                      this.router.navigateByUrl('login');
                  },
                  err => {
                      console.log(err);
                     this.errorMessage = err.message;
                     this.successMessage = "";
                 })
 })
    //
    // this.authService.createUser(value)
    //   .then(res => {
    //     console.log(res);
    //     this.errorMessage = "";
    //     this.successMessage = "Your account has been created. Please log in.";
    //       this.router.navigateByUrl('login');
    //   }, err => {
    //     console.log(err);
    //     this.errorMessage = err.message;
    //     this.successMessage = "";
    //   })
  }




}
