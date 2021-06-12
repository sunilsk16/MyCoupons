import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { IonicModule } from '@ionic/angular';

import { AdminDealsPageRoutingModule } from './admin-deals-routing.module';

import { AdminDealsPage } from './admin-deals.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    AdminDealsPageRoutingModule
  ],
  declarations: [AdminDealsPage]
})
export class AdminDealsPageModule {}
