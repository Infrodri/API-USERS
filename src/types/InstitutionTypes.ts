import { Document } from "mongoose";

export interface IInstitution extends Document {
  name: string;
  department: string;
  logo?: string;
  legalText?: string;
  address?: string;
  phone?: string;
  website?: string;
  isActive: boolean;
}
