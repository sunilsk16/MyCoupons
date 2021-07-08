import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { UserService } from '../../_services/user/user.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit, AfterViewInit {
   @ViewChild('search', { static: false }) search: any;

   public temp: Array<object> = [];
    public rows: Array<object> = [];
    public columns: Array<object>;

  constructor(private userService: UserService,) {

  }

  ngOnInit() {

    this.columns = [
     { name: 'Email' },
     { name: 'First Name' },
     { name: 'Phone Number' },
      { name: 'Birth Date' },
    ];

    this.userService.fethAllUser()
    .then((res:any) =>{
     console.log('role ', res);
       this.rows = this.temp=res;
      })

  }
  ngAfterViewInit(): void {
     // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
     // Add 'implements AfterViewInit' to the class.
     fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
   }

   updateFilter(val: any) {
     const value = val.toString().toLowerCase().trim();
     // get the amount of columns in the table
     const count = this.columns.length;
     // get the key names of each column in the dataset
     const keys = Object.keys(this.temp[0]);
     // assign filtered matches to the active datatable
     this.rows = this.temp.filter(item => {
       // iterate through each row's column data
       for (let i = 0; i < count; i++) {
         // check for a match
         if (
           (item[keys[i]] &&
             item[keys[i]]
               .toString()
               .toLowerCase()
               .indexOf(value) !== -1) ||
           !value
         ) {
           // found match, return true to add to result set
           return true;
         }
       }
     });

     // Whenever the filter changes, always go back to the first page
     // this.table.offset = 0;
   }

   findAll() {

     this.userService.fethAllUser()
     .then((res:any) =>{
      console.log('role ', res);
        this.rows = res;
       })

 }


//   updateFilter(event) {
//
//     const val = event.target.value.toLowerCase();
//     if(val) {
//         this.temp = this.rows;
//         // filter our data
//         const temp = this.temp.filter(function (d) {
//           return ( d.name.toLowerCase().indexOf(val) !== -1 || d.email.toLowerCase().indexOf(val) !== -1 || !val);
//         });
//         this.rows = temp;
//     }
//     else
//     {
//         this.rows = this.perttemp;
//     }
// }

}
