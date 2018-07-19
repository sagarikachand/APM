import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import {RouterModule} from '@angular/router'
import { ProductModule } from './product-list/product.module';


import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { ProductData } from './in-memory-data'


@NgModule({
  declarations: [
   AppComponent,
   WelcomeComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      ProductData, { dataEncapsulation: false , delay:1000}
    ),
    ProductModule, 
    RouterModule.forRoot([
      
      {path: 'welcome',component: WelcomeComponent},
      {path: '',redirectTo:'welcome', pathMatch:'full'},
      {path: '**',redirectTo:'welcome', pathMatch:'full'}
    ]),

    
    // Here configure routes only for root. forRoot - registers Router instance, declares Router Directives and expose Configured routes,
    // Routes can got its own module.
    
   
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
