import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-next-button',
  imports: [ButtonComponent],
  templateUrl: './next-button.component.html',
  styleUrl: './next-button.component.css'
})
export class NextButtonComponent {
  disabled = input<boolean>(false);
}
