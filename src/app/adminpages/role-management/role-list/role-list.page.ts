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
 public columns: any;
  public rows: any;
  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.columns = [
     { name: 'RoleValue' },
     { name: 'RoleName' },
     { name: 'Permissions' }
   ];

   this.userService.fethAllRoles()
   .then((res:any) =>{
    console.log('role ', res);
      this.rows = res;
     })
 }

  async open(row) {
		console.log(row);
	}

  ngOnDestroy(): void {

 }
}
