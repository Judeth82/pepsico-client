import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'general-layout',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
  imports: [CommonModule, RouterModule],
})
export class GeneralLayoutComponent {
  protected showNavigationItems: boolean = true;

  constructor() { }

  /**
     * Getter for current year
     */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  protected clearHeaderData(): void {

  }
}
