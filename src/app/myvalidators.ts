import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function ageValidator(min:number, max:number) : ValidatorFn{

   return (control:AbstractControl):ValidationErrors | null  =>{

        if(control.value != undefined && (isNaN(control.value) || control.value < min || control.value > max )){
           return {
            "ageError":true
           }
        }
        return null; 
   }

}