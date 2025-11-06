import { NgFor, NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  imports: [NgIf,NgFor],
  templateUrl: './step-progress.component.html',
  styleUrl: './step-progress.component.css'
})
export class StepProgressComponent {
  @Input() currentStep:number = 1;
  @Input() steps: string[] = [];
  @Input() completedSteps: boolean[] = [];
}
