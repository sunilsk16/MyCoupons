import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRolePageRoutingModule } from './create-role-routing.module';

import { CreateRolePage } from './create-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRolePageRoutingModule
  ],
  declarations: [CreateRolePage]
})
export class CreateRolePageModule {}
