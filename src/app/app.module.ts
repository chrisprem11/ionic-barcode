import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SQLite } from '@ionic-native/sqlite';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { CartDetailsPage } from '../pages/cart-details/cart-details'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrderDetailPage,
    ProductDetailsPage,
    CartDetailsPage
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OrderDetailPage,
    ProductDetailsPage,
    CartDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,BarcodeScanner,SQLite,AppConfigProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
