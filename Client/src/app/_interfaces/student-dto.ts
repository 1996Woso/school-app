import { AddressDto } from "./address-dto";

export interface StudentDto {
      firstName: string;
      secondName?: string;
      lastName: string;
      gender: string;
      identityNumber: string;
      email?: string;
      phone?: string;
      dateOfBirth: string;
      AddressDto: AddressDto;
}

