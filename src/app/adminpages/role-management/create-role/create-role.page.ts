import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { UserService } from '../../../_services/user/user.service';
import { AlertService } from '../../../_services/alert.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.page.html',
  styleUrls: ['./create-role.page.scss'],
})
export class CreateRolePage implements OnInit {
  userList: any = [];
roleName: any = '';
isEdit: any = false;
roleData: any;
loggedInUser: any;

  allPages: any = [
    {
      title: 'Home',
      component: 'Home',
      isAllChecked: false,
      permissions: [{
        name: "View",
        value: "HOME_VIEW",
        isChecked: false,
      }]
    }, {
      title: 'Admin Reports',
      component: 'Reports',
      isAllChecked: false,
      permissions: [{
        name: "Admin Reports View",
        value: "ADMIN_REPORTS_VIEW",
        isChecked: false,
      }, {
        name: "Acquisitions View",
        value: "ADMIN_ACQUISITIONS_REPORTS_VIEW",
        isChecked: false,
      }, {
        name: "Month-Wise Acquisitions View",
        value: "ADMIN_MONTHLY_ACQUISITIONS_REPORTS_VIEW",
        isChecked: false,
      },
       {
        name: " User Report View",
        value: "ADMIN_CORPORATE_USER_REPORTS_VIEW",
        isChecked: false,
      },]
    }, {
      title: 'Admin - Subscription',
      component: 'Admin Subscription',
      isAllChecked: false,
      permissions: [{
        name: "Subscription View",
        value: "ADMIN_SUBSCRIPTION_VIEW",
        isChecked: false,
      }]
    }, {
      title: 'Admin Operations',
      component: 'Admin Operations',
      isAllChecked: false,
      permissions: [{
        name: "Coupons View",
        value: "ADMIN_COUPONS_VIEW",
        isChecked: false,
      }, {
        name: "Create Coupons",
        value: "ADMIN_CREATE_COUPONS",
        isChecked: false,
      },
      {
        name: "Delete Coupons",
        value: "ADMIN_DELETE_COUPONS",
        isChecked: false,
      }, {
        name: "Update Coupons",
        value: "UPDATE",
        isChecked: false,
      }]
    }, {
      title: 'Role Management',
      component: 'Role Management',
      isAllChecked: false,
      permissions: [{
        name: "View",
        value: "ROLE_MANAGEMENT_VIEW",
        isChecked: false,
      }, {
        name: "Create",
        value: "ROLE_MANAGEMENT_CREATE",
        isChecked: false,
      }, {
        name: "Edit",
        value: "ROLE_MANAGEMENT_EDIT",
        isChecked: false,
      }, {
        name: "Delete",
        value: "ROLE_MANAGEMENT_DELETE",
        isChecked: false,
      }, {
        name: "Active/Inactive",
        value: "ROLE_MANAGEMENT_ACTIVE_INACTIVE",
        isChecked: false,
      }
      ]
    }, {
      title: 'User Management',
      component: 'User Management',
      isAllChecked: false,
      permissions: [{
        name: "View",
        value: "USER_MANAGEMENT_VIEW",
        isChecked: false,
      }, {
        name: "Create",
        value: "USER_MANAGEMENT_CREATE",
        isChecked: false,
      }, {
        name: "Edit",
        value: "USER_MANAGEMENT_EDIT",
        isChecked: false,
      }, {
        name: "Delete",
        value: "USER_MANAGEMENT_DELETE",
        isChecked: false,
      }, {
        name: "Active/Inactive",
        value: "USER_MANAGEMENT_ACTIVE_INACTIVE",
        isChecked: false,
      }]
    },

  ]

  constructor(private userService: UserService,
  private alertService: AlertService,) {
    if (window.localStorage.getItem('currentUser')) {
      this.loggedInUser = JSON.parse(window.localStorage.getItem('currentUser'));
    } }

  ngOnInit() {
  }
  checkAllPermission(page: any) {
    _.each(page.permissions, function(p: any) {
      p.isChecked = page.isAllChecked
    })
  }

  refreshPages() {
  return new Promise((resolve) => {
    _.each(this.allPages, function(page: any) {
      page.isAllChecked = false;
      _.each(page.permissions, function(p: any) {
        p.isChecked = false;
      })
    })
    resolve();
  })
}
createRole() {
  if (!this.roleName) {
    this.alertService.showToast("Role Name is manadatory !!");
    return false;
  }
  let pList = [];
  _.filter(this.allPages, function(page: any) {
    _.each(page.permissions, function(p: any) {
      if (p.isChecked) {
        pList.push(p.value)
      }
    })
  })

  if (!pList.length) {
    this.alertService.showToast("Select atleast one permission");
    return false;
  }

  let role: any = {};
  if (this.isEdit) {
    role = this.roleData;
    role.roleName = this.roleName;
    role.updated_by = this.loggedInUser;
    role.permissions = pList;
    // role.updated_on = moment().format('DD-MM-YYYY hh:mm A');
    // role.timeStamp = moment().format('x');
  } else {
    role = {
      roleName: this.roleName,
      roleValue: Math.floor(Math.random() * 10000),
      permissions: pList,
      created_by: this.loggedInUser,
      updated_by: this.loggedInUser,
      // created_on: moment().format('DD-MM-YYYY hh:mm A'),
      // updated_on: moment().format('DD-MM-YYYY hh:mm A'),
      // timeStamp: moment().format('x')
    }
  }
  console.log(role);
  // this.helper.showLoading();
  this.userService.createRole(role)
    .then(() => {
      return this.refreshPages();
    })
    .then(() => {
      // this.helper.hideLoading();
      let msg = this.isEdit ? 'Updated' : 'Created'
      this.alertService.showToast('Role ' + msg + ' successfully');
      this.roleName = ''
    })
    .catch((err:any) => {
      // this.helper.hideLoading();
      this.alertService.showToast('Error creating role');
      console.log(err);
    })
}
setUserInStorage(res) {
  if (res.user) {
    localStorage.setItem('currentUser', JSON.stringify(res.user));
  } else {
    localStorage.setItem('currentUser', JSON.stringify(res));
  }
}

ngOnDestroy(): void {
  this.alertService.showToast('Error creating role');
}

}
