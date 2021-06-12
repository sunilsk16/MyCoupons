import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { IonicModule } from '@ionic/angular';

import { AdminRewardsPageRoutingModule } from './admin-rewards-routing.module';

import { AdminRewardsPage } from './admin-rewards.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRewardsPageRoutingModule
  ],
  declarations: [AdminRewardsPage]
})
export class AdminRewardsPageModule {}
