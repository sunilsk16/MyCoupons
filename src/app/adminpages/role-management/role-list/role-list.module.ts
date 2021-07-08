import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleListPageRoutingModule } from './role-list-routing.module';

import { RoleListPage } from './role-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    RoleListPageRoutingModule
  ],
  declarations: [RoleListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoleListPageModule {}
