import { AddressDto } from './address-dto';

export interface GuardianDto {
  firstName: string;
  secondName?: string;
  lastName: string;
  gender: string;
  relationship: string;
  identityNumber: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  AddressDto: AddressDto;
}
