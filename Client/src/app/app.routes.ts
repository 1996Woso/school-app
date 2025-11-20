import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { RegisterStudentComponent } from './students/register-student/register-student.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'students', component:StudentListComponent},
    {path: 'register-student', component: RegisterStudentComponent}
];
