import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardsListPage } from './rewards-list.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardsListPageRoutingModule {}
