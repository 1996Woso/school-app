import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [NgClass],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
})
export class HeadingComponent {
  containerClass = input<string | string[] | { [key: string]: boolean }>({});
  titleClass = input<string | string[] | { [key: string]: boolean }>({});
  subClass = input<string | string[] | { [key: string]: boolean }>({});
}
