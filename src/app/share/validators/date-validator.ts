import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado para validar fechas.
 * Opcionalmente valida que la fecha esté dentro de un rango (minDate y maxDate).
 * 
 * @param minDate Fecha mínima permitida (inclusive). Puede ser Date o string en formato ISO.
 * @param maxDate Fecha máxima permitida (inclusive). Puede ser Date o string en formato ISO.
 * @returns ValidatorFn que valida el control.
 */
export function fechaRangoValidator(minDate?: Date | string, maxDate?: Date | string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            // No hay valor, no valida nada aquí (puede usar Validators.required aparte)
            return null;
        }

        //Este valida que la fecha sea una fecha con el "isNan" pero no sé que tanto funcione porque se podria poner una fecha en letras, pero
        //Esta validacion la va a tirar mal porque solo acepta numeros shi :)
        const fecha = new Date(value);
        if (isNaN(fecha.getTime())) {
            // No es una fecha válida
            return { fechaInvalida: { valor: value } };
        }

        //Esta es para que la fecha no sea menor a la de hoy
        if (minDate) {
            const min = (minDate instanceof Date) ? minDate.getTime() : new Date(minDate).getTime();
            if (fecha.getTime() < min) {
                return { fechaMenorQueMinima: { minFecha: minDate, valor: value } };
            }
        }

        // y esta para la fecha maxima pero no creo que lo use la verdad :)
        if (maxDate) {
            const max = (maxDate instanceof Date) ? maxDate.getTime() : new Date(maxDate).getTime();
            if (fecha.getTime() > max) {
                return { fechaMayorQueMaxima: { maxFecha: maxDate, valor: value } };
            }
        }

        return null; // válido
    };
}
