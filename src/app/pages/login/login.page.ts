import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { MenuController } from '@ionic/angular';
import { UserService } from '../../_services/user/user.service';
import { AlertService } from '../../_services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  email: any;
  password: any;
  currentUser: any;
  submitted = false;
  isActiveLogin: any = false;
  loading = false;
  returnUrl: string;
  isForceLogin: any = false;

  constructor(private formBuilder: FormBuilder,
  private router: Router,
  private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
public menu: MenuController) {
   this.menu.swipeGesture(false)
 }

  ngOnInit() {
    this.email = "";
    this.password = '';
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: true
    });
    if (localStorage.getItem('remember')) {
      localStorage.removeItem('currentLayoutStyle');
    this.router.navigate(['/dashboard']);
  } else if (localStorage.getItem('currentUser')) {
    } else {
    }
  }

  get f() { return this.loginForm.controls; }


  doForceLogin(){
      console.log('am in doForceLogin ')
      this.isForceLogin = true;
      this.currentUser.isActiveSession = false;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      this.userService.updateUser(this.currentUser.id, this.currentUser)
      this.signIn();
    }

  signIn() {
      this.submitted = true;
        // stop here if form is invalid

      const value = {
        email: this.f.email.value,
        password: this.f.password.value
      };
      this.authService.signinUser(value)
        .then(res => {
          console.log('after login ', res, this.currentUser);
              this.getCurrentUser(res.user.uid)
            .then(() => {
              if(!this.currentUser){
                this.submitted = false;
              this.alertService.showToast('No User Account found ');
                return false;
              }
              if(this.currentUser && this.currentUser.isActiveSession){
                 this.isActiveLogin = true;
                this.submitted = false;
                this.alertService.showToast('Multiple logins not allowed ');
                return false;
              }
              if (this.currentUser && this.currentUser.id && !this.currentUser.mailVerified) {
                this.currentUser.mailVerified = true;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
                this.userService.updateUser(this.currentUser.id, this.currentUser)
              }
              })
            .then(() => {
              if (this.currentUser.isActive) {
                localStorage.removeItem('currentLayoutStyle');
                 let returnUrl = '/home';
                if (this.returnUrl) {
                  returnUrl = this.returnUrl;
                }
                this.userService
                  .getUserRole(this.currentUser.roleValue)
                  .subscribe((res: any) => {
                    console.log("curr user permissions ", res);
                      if (res && res.length) {
                      window.localStorage.setItem(
                        "permissions",
                        JSON.stringify(res[0].permissions)
                      );
                    }
                    if(!this.currentUser.isActiveSession){
                      this.currentUser.isActiveSession = true;
                      this.currentUser.activeSessionToken = this.userService.generateUniqNumber(16)
                      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
                      this.userService.updateUser(this.currentUser.id, this.currentUser)
                      console.log('isActiveSession ', this.currentUser);
                      this.router.navigate(['/home']);
                    }

                  });

              } else {
                this.submitted = false;
                this.alertService.showToast('Account has been suspended ');
              }
            })
        }, err => {
          this.submitted = false;
          this.alertService.showToast(err.message);
        });
    }


  // signIn(value) {
  //       this.authService.signinUser(value)
  //       .then((response) => {
  //           this.getCurrentUser(response.user.uid)
  //         console.log(response)
  //         this.errorMsg = "";
  //         this.router.navigateByUrl('home');
  //       },
  //
  //       error => {
  //         this.errorMsg = error.message;
  //         this.successMsg = "";
  //       })
  //   }

    goToSignup() {
      this.router.navigateByUrl('register');
    }
    getCurrentUser(uid: any) {
    return new Promise<void>((resolve) => {
      this.userService.getUserById(uid)
        .then((res: any) => {
          console.log('user after :: login ', res);
          if (res && res.length) {
            this.currentUser = res[0];
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          }
          resolve();
        })
    })
  }
}
