import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';



@Component({
  selector: 'order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {

  barcodeText: any;
  barcodeTextVariantTwo : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.barcodeText = this.navParams.get("barcode");
    this.barcodeText =  this.navParams.get("qtyformat");
    this.barcodeTextVariantTwo = this.navParams.get("slashnformat");
  }

  ionViewDidLoad() {

  }

  goBack() {
    this.navCtrl.pop();
  }

}
