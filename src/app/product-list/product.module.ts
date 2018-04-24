import { NgModule } from '@angular/core';

import { ProductDetailsComponent } from './product-details.component';
import { ProductListComponent } from './product-list.component';
import { StarComponent } from '../shared/star/star.component';
import { convertToSpacesPipe } from '../pipes/convertToSpaces.pipe';

import { RouterModule } from '@angular/router';
import { ProductDetailsCanActivateService } from './product-details.canActv.guard';
import { ProductService } from '../product.service';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditGuard } from './product-edit.guard';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
   
    RouterModule.forChild([
      {path: 'products',component: ProductListComponent},
      {path: 'products/:id',component: ProductDetailsComponent, canActivate:[ProductDetailsCanActivateService]},
      {path: 'productEdit/:id',component: ProductEditComponent, canDeactivate:[ ProductEditGuard]}
      
    ]),
    
  ],
  declarations: [ProductDetailsComponent,
                 ProductListComponent,
                 convertToSpacesPipe,
                 ProductEditComponent],
  providers:[ProductService,
             ProductDetailsCanActivateService,
             ProductEditGuard]
})
export class ProductModule { }
