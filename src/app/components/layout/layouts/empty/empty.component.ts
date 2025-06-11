import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
  imports: [RouterOutlet],
})
export class EmptyLayoutComponent {

}
