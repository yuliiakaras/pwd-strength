import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value || '';

    if (!password) {
      return { strength: 'empty' };
    }

    if (password.length < 8) {
      return { strength: 'tooShort' };
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const criteriaCount = [hasLetters, hasDigits, hasSymbols].filter(Boolean).length;

    const strength = 
      criteriaCount === 3 ? 'strong' : 
      criteriaCount === 2 ? 'medium' : 
      'easy';

    return { strength };
  };
}
