import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { ProductEditComponent } from "./product-edit.component";



@Injectable()
// The generic in Candeactivate<ProductEditComponent> is passed to canDEactivate method
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    constructor( ) {}
  
    canDeactivate(component : ProductEditComponent){
        if (component.productForm.dirty){
            let productName= component.productForm.get('productName').value || 'New Product';
            return confirm(`The changes to ${productName} will be lost. Wish to navigate away?`)
        }
        return true;
    }
    
}