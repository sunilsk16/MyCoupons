import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmincouponsPageRoutingModule } from './admincoupons-routing.module';

import { AdmincouponsPage } from './admincoupons.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    AdmincouponsPageRoutingModule
  ],
  declarations: [AdmincouponsPage]
})
export class AdmincouponsPageModule {}
