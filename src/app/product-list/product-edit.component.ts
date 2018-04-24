import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormControlName, FormArray, Validators } from '@angular/forms';
import { NumberRangeValidator } from '../shared/numberRange.validator'
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { ProductService } from '../product.service';
import { IProduct } from '../product';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  title: string = "Edit"
  id: number;
  sub;
  selectedProduct: IProduct;
  errorMessage: string;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    // This approach is ok if the product Id will not change  eg. from productEdit/2 to directly productEdit/10
    // this.id = +(this.route.snapshot.params['id'])
    // So instead use observable approach

    this.sub = this.route.params
      .subscribe(
      params => {
        let id = +params['id'];
        this.productService.getProductById(id)
          .subscribe(
          (product: IProduct) => {
            this.selectedProduct = product;
            console.log("The selectedProduct is")
            console.log(this.selectedProduct)
            this.populateForm();

          }
          )
      }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createForm() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      ]
      ],
      productCode: ['', Validators.required],
      //  Here just write the name of the validator function and pass it the desired paramaters.
      starRating: ['', NumberRangeValidator(1, 5)],
      tags: this.fb.array([]),
      description: ''
    })
  }

  //  Get the formArray using a getter
  get tags() {
    return this.productForm.get('tags') as FormArray;
  }

  //  Duplicating a formArray.
  addtag() {
    this.tags.push(new FormControl());
  }
  removeTag(index) {
    this.tags.removeAt(index)
  }
  populateForm() {
    if (this.productForm) {
      this.productForm.reset();
    }
    console.log("populating ")
    if (this.id == 0) {
      this.title = "Add"
    }
    this.productForm.patchValue({
      productName: this.selectedProduct.productName,
      productCode: this.selectedProduct.productCode,
      starRating: this.selectedProduct.starRating,
      description: this.selectedProduct.description
    })
    //  Setting the fromArray using setControl and not in patchvalue or setValue
    this.productForm.setControl('tags', (this.fb.array(this.selectedProduct.tags || [])));
  }

  onSaveClick(): void {

    let p = Object.assign({}, this.selectedProduct, this.productForm.value);
    if (this.productForm.dirty && this.productForm.valid) {
      this.productService.saveProduct(p)
        .subscribe(
        () => this.afterSave(),
        (error: any) => this.errorMessage = <any>error
        )
    }
    else if (!this.productForm.dirty) {
      this.afterSave();
    }

  }

  afterSave() {
    console.log("After save")
    this.productForm.reset();
    this.router.navigate(['/products'])
  }

  deleteProduct() {
    if (this.selectedProduct.id == 0) {
      // Dont delete. This product is not yet saved
      this.afterSave()
    } else {
      if (confirm(`Deleting ${this.selectedProduct.productName}.   Are you sure ?`)) {
        this.productService.deleteProduct(this.selectedProduct)
          .subscribe(
          () => this.afterSave()
          )
      }
    }


  }
}
