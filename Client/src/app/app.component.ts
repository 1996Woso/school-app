import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterStudentComponent } from "./students/register-student/register-student.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
