import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRewardsPage } from './admin-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRewardsPageRoutingModule {}
