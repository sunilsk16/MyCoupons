import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberListPageRoutingModule } from './member-list-routing.module';

import { MemberListPage } from './member-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberListPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [MemberListPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MemberListPageModule {}
