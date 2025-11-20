import { Address } from "./address";
import { Guardian } from "./guardian";

export interface Student {
  id: number;
  firstName: string;
  secondName?: string;
  lastName: string;
  gender: string;
  identityNumber: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  guardianId: number;
  Adress: Address;
  Guardian: Guardian;
}
