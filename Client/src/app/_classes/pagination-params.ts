export class PaginationParams {
    private readonly maxPageSize = 20;
    pageNumber: number = 1;
    private _pageSize: number = 1;

    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(value: number) {
        this._pageSize = value >this.maxPageSize ? this.maxPageSize : value;
    }
}
