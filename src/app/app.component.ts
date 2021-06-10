import { Component } from '@angular/core';
import { NavController, Platform, MenuController } from '@ionic/angular';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userKey: string;
  userName: string;
  profile = null;
  profileImageUrl = "";
  allpages: any = [];
  currentUser: any;

  constructor(
    private platform: Platform,
    private authSrv: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.initializeApp();
    }
  initializeApp() {
    this.platform.ready().then(() => {
    });
    if (window.localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(window.localStorage.currentUser)
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
        });
    }
    this.allpages = [
        {
          title: "Home",
          url: "/dashboard",
          icon: "home",
          roleValue: "HOME_VIEW"
        },
        {
          title: "Coupons",
          url: "/admincoupons",
          icon: "ticket",
          roleValue: "HOME_VIEW"
        },
        {
          title: "Coupons",
          url: "/coupons",
          icon: "ticket",
                },
        {
          title: "Deals",
          url: "/deals",
          icon: "wine"
        },
        {
          title: "Rewards",
          url: "/rewards",
          icon: "gift"
        },
        {
          title: "Reffer & Earn",
          url: "/refer",
          icon: "people-circle"
        },
        {
          title: "History",
          url: "/payments",
          icon: "card-outline"
        },
        {
          title: "Terms & Conditinos",
          url: "/terms",
          icon: "reader"
        },
        {
          title: "Helps",
          url: "/help",
          icon: "help-circle"
        },
        {
          title: "Contact Us",
          url: "/contact",
          icon: "open"
        },
        {
          title: "About",
          url: "/about",
          icon: "information-circle"
        },

        ///Admin Pages side Menu View
        {
          title: "Create Role",
          url: "/create-role",
          icon: "circle"
        },
        {
          title: "View Role",
          url: "/role-list",
          icon: "circle"
        }
  ]
  }

  signoutUser() {
    this.authSrv.signoutUser().then(res => {
      localStorage.removeItem('currentUser');
      // console.log(res);
      this.menuCtrl.close();
      this.navCtrl.navigateBack('');
    }).catch(error => {
      console.log(error);
    });
  }

}
