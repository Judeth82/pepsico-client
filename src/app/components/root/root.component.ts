import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pco-root',
  templateUrl: './root.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class RootComponent {

}
