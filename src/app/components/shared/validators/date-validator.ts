import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(control: AbstractControl) {
  if (moment(control.value, 'DDMMYYYY').isValid()) {
    return null;
  }
  return {dateValid: true};

}
