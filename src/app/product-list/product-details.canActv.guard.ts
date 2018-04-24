import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";



@Injectable()
export class ProductDetailsCanActivateService implements CanActivate{

    constructor(private router:Router){}
      canActivate(route:ActivatedRouteSnapshot):boolean{
          let id= +route.url[1].path
          if(isNaN(id) || id<1 ){
              
              this.router.navigate(['/products'])
              return false;
          }
          return true;
      }
}