import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsListPage } from './deals-list.page';

const routes: Routes = [
  {
    path: '',
    component: DealsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsListPageRoutingModule {}
