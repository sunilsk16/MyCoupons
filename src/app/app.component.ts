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
          url: "/a/dashboard",
          icon: "home",
          roleValue: "HOME_VIEW",

        },
        {
          title: "Home",
          url: "/home",
          icon: "home",
        roleValue: "USER_MANAGEMENT_VIEW",

        },
        {
          title: "Members",
          url: "/member-list",
          icon: "ticket",
          roleValue: "HOME_VIEW"
        },
        {
          title: "Admin-Coupons",
          url: "/coupons-list",
          icon: "ticket",
          roleValue: "HOME_VIEW"
        },
        {
          title: "Admin-Deals",
          url: "/deals-list",
          icon: "wine",
          roleValue: "HOME_VIEW"
        },
        {
          title: "Admin-Rewards",
          url: "/rewards-list",
          icon: "gift",
          roleValue: "HOME_VIEW"
        },
        {
          title: "FAQ",
          url: "/create-faq",
          icon: "gift",
          roleValue: "HOME_VIEW"
        },
        {
          title: "Coupons",
          url: "/coupons",
          icon: "ticket",
          roleValue: "USER_MANAGEMENT_VIEW"
                },
        {
          title: "Deals",
          url: "/deals",
          icon: "wine",
          roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "Rewards",
          url: "/rewards",
          icon: "gift",
            roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "Reffer & Earn",
          url: "/refer",
          icon: "people-circle",
          roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "History",
          url: "/payments",
          icon: "card-outline",
            roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "Terms & Conditinos",
          url: "/terms",
          icon: "reader",
            roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "Helps",
          url: "/help",
          icon: "help-circle",
            roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "Contact Us",
          url: "/contact",
          icon: "open",
            roleValue: "USER_MANAGEMENT_VIEW"
        },
        {
          title: "About",
          url: "/about",
          icon: "information-circle",
            roleValue: "USER_MANAGEMENT_VIEW"
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
