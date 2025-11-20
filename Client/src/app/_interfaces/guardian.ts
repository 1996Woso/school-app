import { Address } from "./address";
import { Student } from "./student";

export interface Guardian {
  id: number;
  firstName: string;
  secondName?: string;
  lastName: string;
  gender: string;
  relationship: string;
  identityNumber: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  addressId: number;
  Address: Address
  Students: Student[];
}
