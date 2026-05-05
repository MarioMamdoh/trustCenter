export enum UserRole {
  TEAM_USER = 'teamUser',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}
export enum EmployeeDepartment {
  NURSING = 'nursing',
  MEDICAL = 'medical',
  FINANCE = 'finance',
  DOCTOR = 'doctor',
  ADMINISTRATION = 'administration',
  MANAGER = 'manager',
  RECEPTION = 'reception',
  IT = 'it',
  CUSTOMER_SERVICE = 'customerService',
  SALES = 'sales',
}
export interface EMPLOYEE {
  fullName: string;
  age: number;
  salary: number;
  role: UserRole;
  image: string;
  area: string;
  department: EmployeeDepartment;
  email: string;
  password: string;
  deduction: number;
}
