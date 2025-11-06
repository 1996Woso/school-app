import { GuardianDto } from "./guardian-dto";
import { StudentDto } from "./student-dto";

export interface StudentRegistrationDto {
    student: StudentDto,
    guardian: GuardianDto
}
