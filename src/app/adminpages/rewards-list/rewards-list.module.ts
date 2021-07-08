import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardsListPageRoutingModule } from './rewards-list-routing.module';

import { RewardsListPage } from './rewards-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardsListPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [RewardsListPage]
})
export class RewardsListPageModule {}
