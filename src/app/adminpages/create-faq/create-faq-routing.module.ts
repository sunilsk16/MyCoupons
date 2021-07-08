import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFaqPage } from './create-faq.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFaqPageRoutingModule {}
