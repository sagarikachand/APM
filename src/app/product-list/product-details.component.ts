import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router'
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService : ProductService
              ) { }
  product: IProduct;
  pageTitle: string='Product details'

  ngOnInit() {
    // If you need only initial value of Route, then use snapshot.
    // Here + is changing the string type id to number type id.
    let id = +this.route.snapshot.paramMap.get('id')
    this.pageTitle += `  : ${id}`
    
    this.productService.getProductById(id)
     .subscribe(
         ( data : IProduct ) => this.product = data,
         ( error ) => {console.log(error); console.log("in getProductById")}
     )
    
   
  }
  onBack(){
    this.router.navigate(['/products'])

  }



}
