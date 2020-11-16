import { FormControl, ValidatorFn } from '@angular/forms';

export function listValidator(c: FormControl) : { [key: string]: boolean } | null {

    let validateList: { valid: false }
    return c.value instanceof Array ? c.value.length == 0 ? null : validateList : validateList;
}