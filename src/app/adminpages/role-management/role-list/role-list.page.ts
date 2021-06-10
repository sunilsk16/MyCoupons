import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user/user.service';
import 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.page.html',
  styleUrls: ['./role-list.page.scss'],
})
export class RoleListPage implements OnInit {
  userList: any = [];
    public roleList = [];
    title = 'angulardatatables';
    isLoading: any;

  constructor(private userService: UserService,) { }

  ngOnInit() {

  this.userService.fethAllRoles()
  .then((res:any) =>{
    this.roleList = res;
    console.log('role ', res);
    })
  }
  async open(row) {
		console.log(row);
	}

  ngOnDestroy(): void {

 }
}
