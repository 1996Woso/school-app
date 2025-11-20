import { Guardian } from "./guardian";
import { Student } from "./student";

export interface Address {
  id: number;
  street: string;
  suburb: string;
  city: string;
  province?: string;
  country: string;
  postalCode: string;
  Students: Student[];
  Guardians: Guardian[];
}
