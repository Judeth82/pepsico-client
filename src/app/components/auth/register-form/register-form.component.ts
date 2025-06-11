import { Component } from '@angular/core';
import { FormBaseComponent, FormDefaultsModule } from '@c/shared';
import { RegisterFormModel } from './register-form.model';
import { getGroup } from '@u/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'pco-register-form',
  templateUrl: './register-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormDefaultsModule,
    A11yModule,
  ],
})
export class RegisterFormComponent extends FormBaseComponent<RegisterFormModel> {
  constructor() {
    super(
      getGroup<RegisterFormModel>({
        firstName: { vldtr: [Validators.required] },
        lastName: { vldtr: [Validators.required] },
        phoneNumber: { vldtr: [Validators.required] },
        location: { vldtr: [Validators.required] },
      })
    )
  }
}
