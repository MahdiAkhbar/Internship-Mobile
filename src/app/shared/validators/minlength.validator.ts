import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minlengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value)
            return null;

        return value.length >= 6 ? null : { minlength: true };
    }
}