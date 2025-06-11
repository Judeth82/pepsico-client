import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

interface ExtendedState<TFieldValue> {
  value: TFieldValue;
  disabled?: boolean;
}

type FormControlStateG<TFieldValue> = ExtendedState<TFieldValue> | TFieldValue;

type ValidatorG = ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
type AsyncValidatorG = AsyncValidatorFn | AsyncValidatorFn[] | null;

export class FormControlG<TFieldValue> extends FormControl {
  override value!: TFieldValue;
  constructor(state: FormControlStateG<TFieldValue>, validatorOrOpts?: ValidatorG, asyncValidator?: AsyncValidatorG) {
    super(state, validatorOrOpts, asyncValidator);
  }
}
type Controls<E> = {
  [K in keyof E]: FormControlG<E[K]>;
};

export class FormGroupG<TFormValue> extends FormGroup {
  override value!: TFormValue;
  override readonly valueChanges!: Observable<TFormValue>;

  override controls!: Controls<TFormValue>;
  constructor(controls: Controls<TFormValue>, validatorOrOpts?: ValidatorG, asyncValidator?: AsyncValidatorG) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}

interface SimpleControlInfo<TValue> {
  v?: TValue;
  vldtr?: ValidatorG;
  avldtr?: AsyncValidatorG;
}

export type ControlInfo<E> = {
  [K in keyof E]: SimpleControlInfo<E[K]> | AbstractControl;
};

export const getGroup = <TFormvalue>(
  info: ControlInfo<TFormvalue>,
  validatorOrOpts?: ValidatorG,
  asyncValidator?: AsyncValidatorG
): FormGroupG<TFormvalue> => {
  const controls: Controls<TFormvalue> = {} as Controls<TFormvalue>;

  Object.keys(info).forEach(
    (key) =>
      ((controls as { [key: string]: any })[key] =
        (info as { [key: string]: any })[key] instanceof AbstractControl
          ? (info as { [key: string]: any })[key]
          : new FormControlG((info as { [key: string]: any })[key].v === false ? false : (info as { [key: string]: any })[key].v === null
            ? null : (info as { [key: string]: any })[key].v === 0 ? 0
            : (info as { [key: string]: any })[key].v || '', (info as { [key: string]: any })[key].vldtr, (info as { [key: string]: any })[key].avldtr))
  );

  return new FormGroupG<TFormvalue>(controls, validatorOrOpts, asyncValidator);
};
