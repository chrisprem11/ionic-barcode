import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { OrderDetailPage } from '../order-detail/order-detail';
import { ProductDetailsPage } from '../product-details/product-details';
import { AppConfigProvider } from '../../providers/app-config/app-config'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcodeText: any;
  showText: boolean;
  product: any;
  productImage: any = [];
  productId: any;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private data_service: AppConfigProvider) {

  }

  ionViewDidLoad() {
    this.showText = false;
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      console.log(barcodeData.text + " |..| " + barcodeData.format + " |..| " + barcodeData.cancelled);
      this.barcodeText = barcodeData.text;
      this.showText = true;
      this.fetchProductDetails(this.barcodeText);

    }, (err) => {
      console.log(err);
      alert(err);
    });
  }

  goToCart() {
    console.log("button clicked:");
    this.navCtrl.push(OrderDetailPage, { "barcode": this.barcodeText });
  }

  fetchProductDetails(barcodeText) {
    console.log(barcodeText);
    this.data_service.getAllProducts(barcodeText).then((res) => {
      console.log("Product -- ");
      this.product = res;
      console.log(this.product);
      this.productId = this.product.product_id;
      this.fetchProductImageDetails(this.productId);
      console.log(this.productId);
    }
    ).catch((e) => {
      console.log(e);
    });
    //this.navCtrl.push(ProductDetailsPage, { "barcode": this.barcodeText })
  }

  fetchProductImageDetails(productId) {
    this.data_service.getProductImages(productId).then((res) => {
      this.productImage = res;
      console.log("ProductImage -- ");
      console.log(this.productImage);
      let productDetails = {
        id: this.product.product_id,
        barcode: this.product.barcode,
        image_data: this.productImage,
        name: this.product.product_name,
        price: this.product.product_price
      };
      console.log("FinalData--");
      console.log(productDetails);
      this.navCtrl.push(ProductDetailsPage, { 'product': productDetails });
    }).catch((e) => {
      console.log(e);
    });
  }


}
