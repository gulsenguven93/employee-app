import { create } from 'zustand';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfEmployment: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  department: string;
  position: string;
}

interface EmployeeStore {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (updated) =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === updated.id ? updated : e
      ),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
}));

