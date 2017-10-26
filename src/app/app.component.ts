import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AppConfigProvider } from '../providers/app-config/app-config';



import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  public productTable: any;
  public imageTable: any;
  cart_table: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite,
    private appConfig: AppConfigProvider) {

    this.productTable = this.appConfig.getProducTable();
    this.imageTable = this.appConfig.getProductImage();
    this.cart_table = this.appConfig.getCartTable();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //---
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('DROP TABLE ' + this.productTable, {})
            .then(() => console.log('>>> drop product table.. -'))
            .catch(e => console.log("error while drop product table - " + e));

          db.executeSql('DROP TABLE ' + this.imageTable, {})
            .then(() => console.log('>>> drop product image table.. -'))
            .catch(e => console.log("error while drop product image table - " + e));

          db.executeSql('DROP TABLE ' + this.cart_table, {})
            .then(() => console.log('>>> drop cart table.. -'))
            .catch(e => console.log("error while drop cart table - " + e));
        })
        .catch(e => console.log(e));

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {


          db.executeSql('CREATE TABLE IF NOT EXISTS ' + this.productTable + ' (product_id INTEGER PRIMARY KEY,product_name TEXT, barcode TEXT, product_price INTEGER,quantity INTEGER)', {})
            .then(() => console.log('Executed SQL -' + this.productTable))
            .catch(e => console.log("error in db creation - " + e));


        })
        .catch(e => console.log(e));
      //---

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS ' + this.imageTable + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, image_path TEXT, product_id INTEGER)', {})
            .then(() => console.log('>>> image Table is created -'))
            .catch(e => console.log("error in db creation - " + e));
        })
        .catch(e => console.log(e));
      //----
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE ' + this.cart_table + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, barcode TEXT, product_name TEXT,product_price INTEGER,image_data TEXT,product_id INTEGER, quantity INTEGER)', {})
            .then(() => console.log('>>> Cart Table is created -'))
            .catch(e => console.log("error in db creation - " + e));
        })
        .catch(e => console.log(e));

      //Data Insertion 
      this.insertIntoPorductTable(1, 'Laptop', '201234567899', 500, 1);
      this.insertIntoPorductTable(2, 'Property', '512345000107', 200, 1);
      this.insertIntoPorductImage('property-07f940fa-2377-ea26-d8b6-f49aee331ac0.jpg', 1);
      this.insertIntoPorductImage('property-142731a9-f35f-93a6-9b26-42b8c0c0c58f.jpg', 1);
      this.insertIntoPorductImage('property-14d5b305-c97b-36f7-72a1-fafef5148333.jpg', 2);




      //statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  insertIntoPorductTable(id, name, barcode, price, quantity) {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO ' + this.productTable + ' (product_id,product_name,barcode,product_price,quantity) VALUES(?,?,?,?,?)', [id, name, barcode, price, quantity])
        .then(() => console.log('product data is inserted ..............'))
        .catch(e => { console.log('product data is not inserted ..............'); console.log(e) });
    }).catch(e => console.log('product data is not inserted ..............'));
  }

  insertIntoPorductImage(image_path, productid) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO ' + this.imageTable + ' (image_path,product_id) VALUES(?,?)', [image_path, productid])
        .then(() => console.log('product_image data is inserted ..............'))
        .catch(e => { console.log('product_iamge data is not inserted ..............'); console.log(e) });
    }).catch(e => console.log('product_image data is not inserted ..............'));
  }
}

