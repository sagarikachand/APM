import { Component, OnInit } from '@angular/core';
import {IProduct} from '../product'
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  

  pageTitle:string="Product List";
  imageWidth:number =50;
  imageMargin:number=2;
  hidden:boolean=true;
  _listFilter:string="";
  filteredProductList:IProduct[];
  products:IProduct[];
  errorMessage:string;

  constructor(private productService: ProductService) { }
  
  ngOnInit():void {
  
    this.productService.getProducts()
    .subscribe(
      (products:IProduct[]) => {
                  this.products = products; 
                  this.filteredProductList=this.products},
       error  => this.errorMessage = <any>error);
    
  }

  // Whenever we try to access a parameter named listFilter the get function will be executed
get listFilter(){
  return this._listFilter;

}
// WhenEver listFilter value changes the set function is executed 
set listFilter(value){
  this._listFilter=value;
  this.filteredProductList= this.listFilter ? this.filterBasedOnVal(this.listFilter) : this.products;
}

filterBasedOnVal(filterBy:string) :IProduct[]{
  //  The filter method returms  new array. It executes a function for  each entry of an array and if that function returns true then that entry is 
  //  added to the new array that is returend by filter
    return  this.products.filter((product:IProduct)=>{
              console.log(product.productName)
            return  product.productName.toLowerCase().indexOf(filterBy)!== -1;
      })
}
  toggleImg() {
   this.hidden=!this.hidden;
  }

}
