import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { OrderDetailPage } from '../order-detail/order-detail'


/**
 * Generated class for the CartDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart-details',
  templateUrl: 'cart-details.html',
})
export class CartDetailsPage {

  cart_table: string;
  cart_details: any = [];
  cart_length: number;
  total_price: number = 0;
  product_qty_price = 0;
  //totalpricetoggle : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data_service: AppConfigProvider,
    public sqlite: SQLite) {
  }

  ionViewDidLoad() {
    // this.getProductLengthFromCart(true, false);
    this.getProductLengthFromCart();

  }

  goBack() {
    this.navCtrl.pop();
  }

  getProductLengthFromCart() {//(insertion: boolean, removal: boolean) {
    this.cart_table = this.data_service.getCartTable();
    this.sqlite.create({ name: 'data.db', location: 'default' })
      .then((db: SQLiteObject) => {
        db.executeSql('select * from ' + this.cart_table, {})
          .then((data) => {
            this.cart_length = data.rows.length
            this.cart_details = [];
            this.total_price = 0;
            this.product_qty_price = 0;
            for (let i = 0; i < data.rows.length; i++) {
              this.cart_details.push(data.rows.item(i))
              //if (insertion) {
              console.log("Base price  >>> ", data.rows.item(i).product_price);
              this.product_qty_price = data.rows.item(i).product_price * data.rows.item(i).quantity
              this.total_price += this.product_qty_price;
              //}
              //  else {
              //   this.product_qty_price = data.rows.item(i).product_price * data.rows.item(i).quantity
              //   this.total_price -= this.product_qty_price;
              // }
              console.log(" getProductLengthFromCart >> ", data.rows.item(i));
            }

          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
  }

  addQuantity(product) {
    //UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;

    let qty = product.quantity + 1;
    let price = product.product_price + (product.product_price / product.quantity);
    //this.totalpricetoggle = true;


    this.cart_table = this.data_service.getCartTable();
    this.sqlite.create({ name: 'data.db', location: 'default' })
      .then((db: SQLiteObject) => {
        //db.executeSql('UPDATE ' + this.cart_table + ' SET quantity = ' + qty + ' , product_price = ' + price + ' WHERE id =' + product.id, {})
        db.executeSql('UPDATE ' + this.cart_table + ' SET quantity = ' + qty + ' WHERE id =' + product.id, {})
          .then((data) => {

            console.log("addQuantity >>> ", data);
            // this.getProductLengthFromCart(true, false);
            this.getProductLengthFromCart();


          }).catch(e => console.log(e));
      }).catch(e => console.log(e));

  }

  removeQuantiy(product) {

    if (product.quantity > 1) {
      let qty = product.quantity - 1;
      let price = product.product_price - (product.product_price / product.quantity);
      //this.totalpricetoggle = false;
      this.cart_table = this.data_service.getCartTable();
      this.sqlite.create({ name: 'data.db', location: 'default' })
        .then((db: SQLiteObject) => {
          // db.executeSql('UPDATE ' + this.cart_table + ' SET quantity = ' + qty + ' , product_price = ' + price + ' WHERE id =' + product.id, {})
          db.executeSql('UPDATE ' + this.cart_table + ' SET quantity = ' + qty + ' WHERE id =' + product.id, {})
            .then((data) => {

              console.log("removeQuantiy >>> ", data);
              // this.getProductLengthFromCart(false, false);
              this.getProductLengthFromCart();


            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }
  }

  removeProduct(product) {

    //DELETE FROM COMPANY WHERE ID = 7;

    this.sqlite.create({ name: 'data.db', location: 'default' })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM ' + this.cart_table + ' WHERE id =' + product.id, {})
          .then((data) => {

            console.log("removeProduct >>> ", data);
            // this.getProductLengthFromCart(false, true);
            this.getProductLengthFromCart();


          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
  }

  buy() {
    console.log("buy...");
    let barcodeQtyFormat = '';
    let barcodeslashnformat = '';
    for (let i = 0; i < this.cart_details.length; i++) {
      let b = this.cart_details[i].barcode
      let q = this.cart_details[i].quantity
      let format = b + '=' + q + "$";
      console.log("format -- >>>", format);
      barcodeQtyFormat += format;

      for (let j = 0; j < this.cart_details[i].quantity; j++) {
        console.log('qty length' + j);
        barcodeslashnformat += this.cart_details[i].barcode + ' \r\n'
        console.log("barcodeslessnformat >>>" + barcodeslashnformat)
      }

    }

    console.log("barcodeqtyformat....", barcodeQtyFormat);
    console.log("barcodeslessnformat >>>>", barcodeslashnformat);

    this.navCtrl.push(OrderDetailPage, { 'qtyformat': barcodeQtyFormat, 'slashnformat': barcodeslashnformat })
    let cart = "DELETE FROM " + this.cart_table;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(cart, {})
          .then((data) => {
            console.log('Executed SQL...Data Deleted...');
          })
          .catch(e => console.log('Error.' + JSON.stringify(e)));
      })
      .catch(e => console.log(JSON.stringify(e)));

  }


}
