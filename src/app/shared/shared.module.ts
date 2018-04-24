import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StarComponent],
  // Here shared Module exports the shared modules. Any module importing shared module will have access to the components/modules declared
  // in the exports array below
  exports:[StarComponent, CommonModule, FormsModule]
})
export class SharedModule { }
