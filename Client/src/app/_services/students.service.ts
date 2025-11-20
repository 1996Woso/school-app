import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { StudentRegistrationDto } from '../_interfaces/student-registration-dto';
import { PaginatedResult } from '../_interfaces/pagination';
import { Student } from '../_interfaces/student';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';
import { StudentParams } from '../_classes/student-params';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  paginatedResult = signal<PaginatedResult<Student[]> | null>(null);
  studentCache = new Map();
  studentParams = signal<StudentParams>(new StudentParams());

  resetStudentParams() {
    this.studentParams.set(new StudentParams());
  }

  registerStudent(data: any) {
    return this.http.post<StudentRegistrationDto>(
      this.apiUrl + 'students/register',
      data
    );
  }

  getStudents(): Observable<PaginatedResult<Student[]>> {
    const cacheKey = Object.values(this.studentParams()).join('-');
    const cached = this.studentCache.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    let params = setPaginationHeaders(
      this.studentParams().pageNumber,
      this.studentParams().pageSize
    );

    params = params.append('minAge', this.studentParams().minAge);
    params = params.append('maxAge', this.studentParams().maxAge);
    params = params.append('gender', this.studentParams().gender);
    params = params.append('name', this.studentParams().name);

    return this.http
      .get<Student[]>(`${this.apiUrl}students`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          const paginated: PaginatedResult<Student[]> = {
            items: response.body!,
            pagination: JSON.parse(response.headers.get('Pagination')!),
          };
          this.studentCache.set(cacheKey, paginated);
          return paginated;
        })
      );
  }

  // getStudents(){
  //   const response = this.studentCache.get(
  //     Object.values(this.studentParams()).join('-')
  //   );
  //   if (response) return setPaginatedResponse(response, this.paginatedResult);

  //   let params = setPaginationHeaders(
  //     this.studentParams().pageNumber,
  //     this.studentParams().pageSize
  //   );

  //   params = params.append('minAge', this.studentParams().minAge);
  //   params = params.append('maxAge', this.studentParams().maxAge);
  //   params = params.append('gender', this.studentParams().gender);
  //   params = params.append('name', this.studentParams().name);

  //   return this.http.get<Student[]>(`${this.apiUrl}students`, {observe: 'response', params}).pipe(
  //     tap((response) => {
  //       setPaginatedResponse(response, this.paginatedResult);
  //       this.studentCache.set(Object.values(this.studentParams()).join('-'), response);
  //     })
  //   );
  // }
}
