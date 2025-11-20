import { Injectable } from '@angular/core';
import { PagedList } from '../_interfaces/paged-list';

@Injectable({
  providedIn: 'root',
})
export class PagedListService implements PagedList {
  items(
    pageSize: number,
    totalPages: number,
    totalCount: number,
    currentPage: number
  ): string {
    const currentTotalItems =
      currentPage < totalPages ? pageSize * currentPage : totalCount;
    return `${
      (currentPage - 1) * pageSize + 1
    }-${currentTotalItems} of ${totalCount} items`;
  }
  pages(currentPage: number, totalPages: number): string {
    return `Page ${currentPage} of ${totalPages}`;
  }
}
