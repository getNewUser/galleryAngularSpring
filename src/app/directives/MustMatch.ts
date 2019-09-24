import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // null if controls not initialized yet
        if(!control || !matchingControl){
            return null;
        }


        // return null if another validator already found an error 
        if(matchingControl.errors && !matchingControl.errors.mustMatch){
            return null;
        }

        // set error on matchingControl if validation fails
        if(control.value !== matchingControl.value){
            matchingControl.setErrors({
                mustMatch: true
            });
        }else {
            matchingControl.setErrors(null);
        }
    }
}