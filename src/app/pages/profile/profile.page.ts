import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { AlertService } from '../../_services/alert.service';
import { Platform, MenuController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  registerForm: FormGroup;
  profile = null;
  uid;
  userName: string;
  profileImageUrl = "";
  loggedInUser: any;
  userProfile: any;
  isLoading: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private platform: Platform,
    private alertService: AlertService,
    public menu: MenuController) {
    if (window.localStorage.getItem('currentUser')) {
      this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
      console.log("loginUser", this.loggedInUser);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      phoneNumber: [''],
      email: [''],
      birthDate: ['']
    });
    this.registerForm.patchValue(this.loggedInUser);
    this.userProfile = this.loggedInUser;
    console.log("userProfile", this.userProfile);

  }

  updateUser(value) {
    this.isLoading = true;
    if (!this.registerForm.value.email || !this.registerForm.value.firstName ||
      !this.registerForm.value.phoneNumber) {
      this.alertService.showToast('Enter mandatory fields !!');
      this.isLoading = false;
      return false;
    }
    let data = {
      ...this.loggedInUser,
      ...this.registerForm.value,
    }
    console.log('before :: update ', data);
    this.userService.updateUser(this.loggedInUser.uid, data)
      .then(() => {
        this.isLoading = false;
        this.alertService.showToast('User updated successfully !!')
      })
      .catch(() => {
        this.isLoading = false;
      })
  }

  getUserInfo() {

  }


  //   this.userService.getUserInfo(this.uid).then((doc) => {
  //     if(doc.exists){
  //       console.log(doc.data());
  //       this.profile = doc.data();
  //       this.userName = this.profile.firstName;
  //       this.userService.getProfileImageUrl(this.profile.profileImageUrl).then((res)=>{
  //         this.profileImageUrl = res;
  //         console.log(res)
  //       }).catch((error)=>{
  //           console.log(error);
  //       });
  //     }else{
  //       console.log('error getting document', doc)
  //     }
  // }).catch(function (error){
  //   console.log('error getting document', error)
  // });
  // }
  // editProfile(){
  //     this.router.navigateByUrl('/profile-edit');
  // }
}
