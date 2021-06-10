import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmincouponsPageRoutingModule } from './admincoupons-routing.module';

import { AdmincouponsPage } from './admincoupons.page';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdmincouponsPageRoutingModule
  ],
  declarations: [AdmincouponsPage]
})
export class AdmincouponsPageModule {}
