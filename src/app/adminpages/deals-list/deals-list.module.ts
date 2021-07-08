import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealsListPageRoutingModule } from './deals-list-routing.module';

import { DealsListPage } from './deals-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealsListPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [DealsListPage]
})
export class DealsListPageModule {}
