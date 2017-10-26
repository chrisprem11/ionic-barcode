import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the AppConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConfigProvider {

  public product_table = 'product';
  public product_image = 'product_image'
  public baseCloudUrl = 'https://storage.googleapis.com/image-video/';
  public cart_table = "product_cart"
  cart_details: any = [];
  cart_length: number;
  allProducts: any ;

  constructor(public sqlite: SQLite, ) {

  }

  getProducTable() {
    return this.product_table;
  }

  getProductImage() {
    return this.product_image;
  }

  getCloudUrl() {
    return this.baseCloudUrl;
  }

  setCartDetails(product) {
    this.cart_details.push(product)
  }

  getCartDetails() {
    return this.cart_details
  }

  getCartLength() {
    this.cart_length = this.cart_details.length
    return this.cart_length
  }

  getCartTable() {
    return this.cart_table
  }

  getProduct(barcode) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({ name: 'data.db', location: 'default' })
        .then((db: SQLiteObject) => {
          db.executeSql('select * from ' + this.product_table + ' WHERE barcode =' + barcode, {})
            .then((data) => {
              for (let i = 0; i < data.rows.length; i++) {
                resolve(data.rows.item(i))
              }

            }).catch(e => reject(e));
        }).catch(e => reject(e));
    });
  }

  getProductImages(product_id) {
    let product = [];
    return new Promise((resolve, reject) => {
      this.sqlite.create({ name: 'data.db', location: 'default' })
        .then((db: SQLiteObject) => {
          db.executeSql('select * from ' + this.product_image + ' WHERE product_id =' + product_id, {})
            .then((data) => {
              for (let i = 0; i < data.rows.length; i++) {
                product.push(data.rows.item(i));
                resolve(product);
              }

            }).catch(e => reject(e));
        }).catch(e => reject(e));
    });
  }

  /**This method is used to get the current logged in user.  */
  getAllProducts(barcode): any {
    return new Promise((resolve, reject) => {
        this.sqlite.create({ name: 'data.db', location: 'default' })
            .then((db: SQLiteObject) => {
                db.executeSql('select * from ' + this.product_table + ' WHERE barcode =' + barcode, {})
                    .then((data) => {
                        if (data.rows.length > 0) {
                            this.allProducts = data.rows.item(0);
                            resolve(this.allProducts);
                        } else {
                            reject(this.allProducts);
                        }
                    }).catch(e => reject(e));
            }).catch(e => reject(e));
    });
   
  }


}
