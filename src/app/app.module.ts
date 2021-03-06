import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MycouponsComponent } from 'src/app/mycoupons/mycoupons.component';
import { MydealsComponent } from 'src/app/mydeals/mydeals.component';
import { BuydealsComponent } from 'src/app/buydeals/buydeals.component';
import { MyrewardsComponent } from 'src/app/myrewards/myrewards.component';
import { HelpComponent } from 'src/app/help/help.component';
import { ShowForDirective } from './_directives/show-for.directive';
import { ShowForModule } from './partials/show-for/show-for.module';
import { AuthGuard } from './_guards/auth.guard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QrCodeDirective } from './_directives/qr-code.directive';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';




@NgModule({
  declarations: [AppComponent,MycouponsComponent,MydealsComponent,BuydealsComponent,MyrewardsComponent,HelpComponent, QrCodeDirective],
  entryComponents: [AppComponent,MycouponsComponent,MydealsComponent,BuydealsComponent],
  imports: [BrowserModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    NgxQRCodeModule,
    ShowForModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxDatatableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [ SocialSharing,AuthGuard,FirebaseDynamicLinks,BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
