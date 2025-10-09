import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      employees: [],
      setEmployees: (employees) => set({ employees }),
      addEmployee: (employee) =>
        set((state) => ({ employees: [employee, ...state.employees] })),
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
    }),
    {
      name: 'employee-storage',
    }
  )
);

