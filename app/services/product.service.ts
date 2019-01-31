import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import{ Product } from '../models/product';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public db: AngularFirestore) {  

    //this.products = this.db.collection('products').valueChanges()
  this.productsCollection = this.db.collection('products');
  this.products = this.productsCollection.snapshotChanges().pipe(map(
    actions => actions.map(a => {
    const data = a.payload.doc.data() as Product;
    data.id = a.payload.doc.id;
    return data;
  })));
}

public getProducts(){
  return this.products;
}


public addProduct(product: Product){
  this.productsCollection.add(product);


}


public deleteProducts(product: Product){
  this.productDoc = this.db.doc(`products/${product.id}`);
  this.productDoc.delete();
}


public updateProduct(product: Product){
  this.productDoc = this.db.doc(`products/${product.id}`);
  this.productDoc.update(product);
}

}
