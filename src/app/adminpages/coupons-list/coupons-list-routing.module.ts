import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponsListPage } from './coupons-list.page';

const routes: Routes = [
  {
    path: '',
    component: CouponsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponsListPageRoutingModule {}
