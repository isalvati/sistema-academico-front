import {AbstractControl} from '@angular/forms';
import DocumentUtils from '../utils/document-utils';


export function cpfCnpjValidator(control: AbstractControl) {
  if (DocumentUtils.validCpf(control.value) || DocumentUtils.validCnpj(control.value)) {
    return null;
  }
  return {documentValid: true};
}
