import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { CartDetailsPage } from '../cart-details/cart-details';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';


/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  display_product: any = {};
  baseCloudUrl: string;
  cart_table: string;
  cart_details: any = [];
  cart_length: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data_service: AppConfigProvider,
    public sqlite: SQLite, public toastCtrl: ToastController) {
    this.baseCloudUrl = this.data_service.getCloudUrl();
  }

  presentToast(mesg) {
    const toast = this.toastCtrl.create({
      message: mesg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  ionViewDidLoad() {
    this.getProductLengthFromCart();
    this.display_product = this.navParams.get('product');
    console.log("Product >>> ", this.display_product);
  }

  goToCart() {
    console.log("button clicked:");
    this.navCtrl.push(CartDetailsPage);
  }

  addToCart(display_product) {
    this.addProductIntoCart(display_product);
    this.getProductLengthFromCart();
  }



  addProductIntoCart(product) {


    if (this.cart_details.length == 0) {
      this.add(product)
    } else {
      for (let i = 0; i < this.cart_details.length; i++) {
        if (this.cart_details[i].barcode === product.barcode) {
          this.presentToast("Product is already in cart.");
          return;
        }
      }
      this.add(product);
  }
}

add(product) {
  this.cart_table = this.data_service.getCartTable();
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('INSERT INTO ' + this.cart_table + ' (barcode,product_name,product_price,image_data,product_id,quantity) VALUES(?,?,?,?,?,?)',
      [product.barcode, product.name, product.price, '' + JSON.stringify(product.image_data), product.id, 1])
      .then(() => {
        console.log('cart data is inserted ..............')
        this.presentToast("Product is added in cart.");
      })
      .catch(e => { console.log('cart data is not inserted ..............'); console.log(e) });
  }).catch(e => console.log('cart data is not inserted ..............'));
}

getProductLengthFromCart() {
  this.cart_table = this.data_service.getCartTable();
  this.sqlite.create({ name: 'data.db', location: 'default' })
    .then((db: SQLiteObject) => {
      db.executeSql('select * from ' + this.cart_table, {})
        .then((data) => {
          this.cart_length = data.rows.length
          this.cart_details = [];
          for (let i = 0; i < data.rows.length; i++) {
            this.cart_details.push(data.rows.item(i))
            console.log(">>>>>", data.rows.item(i))
          }
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
}

addAnotherProduct() {
  this.navCtrl.pop();
}



}
