import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponsListPageRoutingModule } from './coupons-list-routing.module';

import { CouponsListPage } from './coupons-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponsListPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [CouponsListPage]
})
export class CouponsListPageModule {}
