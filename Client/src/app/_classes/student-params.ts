import { PaginationParams } from "./pagination-params";

export class StudentParams extends PaginationParams {
    gender: string = '';
    name: string = '';
    minAge: number = 3;
    maxAge: number = 100;
}
