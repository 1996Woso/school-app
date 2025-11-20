import { Component, inject, OnInit } from '@angular/core';
import { StudentsService } from '../_services/students.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PagedListService } from '../_services/paged-list.service';
import { NoDataFoundComponent } from "../shared/no-data-found/no-data-found.component";
import { ButtonComponent } from "../shared/button/button.component";
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { SelectInputComponent } from "../_forms/select-input/select-input.component";

@Component({
  selector: 'app-student-list',
  imports: [RouterLink, FormsModule, PaginationModule, ButtonsModule, NoDataFoundComponent, ButtonComponent, TextInputComponent, SelectInputComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  studentService = inject(StudentsService);
  pagedListService = inject(PagedListService);
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
    { value: '', display: 'All' },
  ];
  pageSizeList: number[] = [1, 2, 5, 10, 15, 20];
  pages: string | undefined;
  items: string | undefined;

  ngOnInit() {
    if (!this.studentService.paginatedResult()) this.loadStudents();
  }
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (result) => {
        const s = result.pagination;
        this.items = this.pagedListService.items(
          s!.itemsPerPage,
          s!.totalPages,
          s!.totalItems,
          s!.currentPage
        );

        this.pages = this.pagedListService.pages(s!.currentPage, s!.totalPages);

        // Optional: update paginatedResult signal if needed
        this.studentService.paginatedResult.set(result);
      },
    });
  }

  resetFilters() {
    this.studentService.resetStudentParams();
    this.loadStudents();
  }

  pageChanged(event: any) {
    if (this.studentService.studentParams().pageNumber != event.page) {
      this.studentService.studentParams().pageNumber = event.page;
      this.loadStudents();
    }
  }
}
