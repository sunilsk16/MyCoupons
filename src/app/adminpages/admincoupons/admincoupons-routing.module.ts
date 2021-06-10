import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmincouponsPage } from './admincoupons.page';

const routes: Routes = [
  {
    path: '',
    component: AdmincouponsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmincouponsPageRoutingModule {}
