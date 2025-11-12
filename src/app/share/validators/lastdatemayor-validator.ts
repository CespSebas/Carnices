import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const fechaFinMayorQueInicioValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const inicio = group.get('fechaInicio')?.value;
    const fin = group.get('fechaFin')?.value;
    if (inicio && fin && new Date(fin) < new Date(inicio)) {
        return { fechaFinMenorQueInicio: true };
    }
    return null;
};