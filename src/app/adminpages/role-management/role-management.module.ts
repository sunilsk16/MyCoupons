import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule  } from '@angular/router';
import{HomePage} from './home.page'

const routes: Routes =[
  {
    path: '',
    redirectTo:'/Home',
    pathMatch:'full'
  },
  {
    path: '',
    component:HomePage,
    children:[
      {
        path: 'create-role',
        loadChildren: () => import('./create-role/create-role.module').then( m => m.CreateRolePageModule)
      },
      {
        path: 'role-list',
        loadChildren: () => import('./role-list/role-list.module').then( m => m.RoleListPageModule)
      },
    ]
  }
]


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule
  ]
})
export class RoleManagementModule { }
