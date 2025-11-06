import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-submit-button',
  imports: [ButtonComponent],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
  disabled = input<boolean>(false);
}
