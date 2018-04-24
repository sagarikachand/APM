import { Injectable } from '@angular/core';

import {HttpClient,HttpResponse, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
// To use HttpClient , import the httpCLientModule, It is usually done in app module

import { IProduct } from './product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { promise } from 'selenium-webdriver';
import {  } from '@angular/common/http/src/headers';
import {  } from '@angular/http/src/base_request_options';

// *********************VEry important.. Throw is    rxjs/add/observable/throw *****************
// import 'rxjs/add/observable/throw';





@Injectable()
export class ProductService {

  private productUrl = 'api/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> | any{
    return this.http.get<IProduct[]>(this.productUrl)
       
        .do(data => console.log('getProducts: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

  getProductById(id): Observable<IProduct>  | any {
    

    if(id==0){
      return Observable.of(this.initializeProduct());
        // return Observable.create((observer: any) => {
        //     observer.next(this.initializeProduct());
        //     observer.complete();
        // });
    }

    // Http client directly sends reponse body in http response.
    // See the angular.io to see how to get the entore httpReponse Object
    var url = `${this.productUrl}/${id}`;
    return this.http.get<IProduct>(url)
      
      .catch(this.handleError);

  }

  saveProduct(product:IProduct): Observable<IProduct> | any{
    let headers= new HttpHeaders({'Content-type':'application/json'})
   
    if(product.id==0){
      return this.createNewProduct(product,headers);
    }
    return this.updateProduct(product,headers);
  }

 private updateProduct(product:IProduct,headers):Observable<IProduct> | any {
   const url= `${this.productUrl}/${product.id}`;

    return this.http.put<IProduct>(url,product,{
      headers:headers
    })
    .map(()=>product)
    .do(  ()=>{console.log("product updated")} )
    .catch(  (error) => this.handleError(error))
  }

  private createNewProduct(product:IProduct,headers):Observable<IProduct> | any {
  
    //   For fake server we need to specify the id as undefined
    product.id=undefined;
     return this.http.post<IProduct>(this.productUrl,product,{
       headers:headers
     })
     .map(()=>product)
     .do(  ()=>{console.log("product created")} )
     .catch(  (error) => this.handleError(error))
   }

   deleteProduct(product:IProduct):Observable<Response>{
     const url=`${this.productUrl}/${product.id}`
     return this.http.delete<Response>(url)
      .do(() => console.log("Product deleted"))
   }
  initializeProduct(){
    return {
      id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
  };
  }

  //  The response has a body property which has data
  private extractData(response: HttpResponse<IProduct[]>) {
    console.log("The response received")
    console.log(response)
}

private handleError(error: HttpErrorResponse):any {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  console.error(error);
  return Observable.throw(error.message|| 'Server error');
}
  





}