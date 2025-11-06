import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StudentRegistrationDto } from '../_interfaces/student-registration-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

 private http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  registerStudent(data: any){
    return this.http.post<StudentRegistrationDto>(this.apiUrl+ 'student/register', data);
  }
}
