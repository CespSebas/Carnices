import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const strongPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value;
  if (!password) return null;

  const errors: ValidationErrors = {};

  if (!/[A-Z]/.test(password)) {
    errors['missingUppercase'] = true;
  }
  if (!/[a-z]/.test(password)) {
    errors['missingLowercase'] = true;
  }
  if (!/[0-9]/.test(password)) {
    errors['missingNumber'] = true;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors['missingSpecialChar'] = true;
  }

  return Object.keys(errors).length ? errors : null;
};

// Validador de coincidencia de contraseñas
export function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPasswordCtrl = group.get('confirmpassword');

  if (password !== confirmPasswordCtrl?.value) {
    confirmPasswordCtrl?.setErrors({ passwordsMismatch: true });
    return { passwordsMismatch: true };
  } else {
    // Quita el error si las contraseñas coinciden
    if (confirmPasswordCtrl?.hasError('passwordsMismatch')) {
      confirmPasswordCtrl.setErrors(null);
    }
    return null;
  }
}
