import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBaseComponent, FormDefaultsModule } from '@c/shared/forms';
import { getGroup } from '@u/forms';
import { SignInFormModel } from './sign-in-form.model';

@Component({
  standalone: true,
  selector: 'pco-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  imports: [
    CommonModule,
    FormDefaultsModule,
    A11yModule,
  ],
})
export class SignInFormComponent extends FormBaseComponent<SignInFormModel> implements AfterViewInit {
  @ViewChild('clientIdField') clientId!: ElementRef;

  constructor() {
    super(
      getGroup<SignInFormModel>({
        clientId: { vldtr: [Validators.required] },
      })
    )
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.clientId.nativeElement.focus();
    }, 2000);
  }
}
