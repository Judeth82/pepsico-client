import { Component } from '@angular/core';
import { FormBaseComponent, FormDefaultsModule } from '@c/shared';
import { RegisterFormModel } from './register-form.model';
import { getGroup } from '@u/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { DistritoDataService } from '@s/distrito-data.service';

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
  constructor(
    protected distritoDataService: DistritoDataService,
  ) {
    super(
      getGroup<RegisterFormModel>({
        nombre: { vldtr: [Validators.required] },
        telefono: { vldtr: [Validators.required] },
        distrito: { vldtr: [Validators.required] },
        direccion: {},
      })
    )
  }
}
