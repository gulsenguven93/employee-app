import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface Employee {
    id:number;
    firstName:string;
    lastName:string;
    dateOfEmployment:string;
    dateOfBirth:string;
    phone:string;
    email:string;   
    department:string;
    position:string;
}

interface EmployeeState {
    list : Employee[];
}

const initialState: EmployeeState = {
    list: [],
}

const employeeSlice = createSlice({
    name: "employees",
    initialState,   
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.list.unshift(action.payload);
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            state.list = state.list.map((employee) => employee.id === action.payload.id ? action.payload : employee);
        },
        deleteEmployee: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((employee) => employee.id !== action.payload);
        },
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.list = action.payload;
        },
    },
    
});

export const { addEmployee, updateEmployee, deleteEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;