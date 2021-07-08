import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFaqPageRoutingModule } from './create-faq-routing.module';

import { CreateFaqPage } from './create-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFaqPageRoutingModule
  ],
  declarations: [CreateFaqPage]
})
export class CreateFaqPageModule {}
