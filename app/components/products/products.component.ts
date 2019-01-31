import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service'; 
import {Product} from '../../models/product'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

products = [];
editingProduct: Product;
editing: boolean = false;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      console.log(products)
      this.products = products;
  });
}

deleteProduct(event, product){
  this.productService.deleteProducts(product);

}

editProduct(event, product){
  this.editingProduct = product;
  this.editing = !this.editing;
}

updateProduct(event, product){
  this.productService.updateProduct(product);

}

}
