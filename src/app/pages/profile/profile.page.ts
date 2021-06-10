import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user/user.service';
import { Platform , MenuController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = null;
    uid;
    userName: string;
    profileImageUrl = ""
  constructor(
        private router: Router,
      private authService: AuthService,
      private userService: UserService,
      private platform: Platform,
    public menu: MenuController) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      if(res !== null){
        this.uid = res.uid;
        this.getUserInfo();

      } else {
        this.uid = '';
      }
    }, err => {
      console.log(err);
      // this.router.navigateByUrl('/login');
    });
  }
  getUserInfo(){
      this.userService.getUserInfo(this.uid).then((doc) => {
        if(doc.exists){
          console.log(doc.data());
          this.profile = doc.data();
          this.userName = this.profile.firstName;
          this.userService.getProfileImageUrl(this.profile.profileImageUrl).then((res)=>{
            this.profileImageUrl = res;
            console.log(res)
          }).catch((error)=>{
              console.log(error);
          });
        }else{
          console.log('error getting document', doc)
        }
    }).catch(function (error){
      console.log('error getting document', error)
    });
    }
    editProfile(){
        this.router.navigateByUrl('/profile-edit');
    }
}
