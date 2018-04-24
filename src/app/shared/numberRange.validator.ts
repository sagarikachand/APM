import { Validator ,AbstractControl ,ValidatorFn } from "@angular/forms";




// This is a simple function that is exported. The return type of this NumberRangeValidator is ValidatorFn
export function NumberRangeValidator(range1:number, range2:number):ValidatorFn {

    // Here the key will be used to fine error in the control Eg. control.error.NumberRange
        return ((control:AbstractControl):{[key:string]:any} =>{
               if(control.value!=undefined && (isNaN(control.value) || control.value >range2 || control.value<range1) ){
                   return { 'NumberRange':true}
               }
            return null;
      })
    
}