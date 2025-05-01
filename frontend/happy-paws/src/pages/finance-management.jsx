import { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "../components/ui/pagination";

import { Plus, Pencil, Trash } from "lucide-react";
import Layout from "../app/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DeleteIncomeDialog,
  EditIncomeDialog,
  InsertIncomeDialog,
} from "../components/pages-components/IncomeDialog";
import {
  DeleteSalaryDialog,
  InsertSalaryDialog,
} from "../components/pages-components/SalaryDialog";
//#region Dummy
// const Salaries = [
//   {
//     id_salary: "sal_001",
//     id_shelter: "shelter_001",
//     id_employee: "emp_001",
//     name: "April Salary - John",
//     cost: 3000000,
//     date: "2025-04-01T09:00:00",
//     note: "Full-time staff",
//     created_at: "2025-04-01T08:45:00",
//     created_by: "admin",
//     updated_at: "2025-04-01T10:00:00",
//     updated_by: "admin",
//   },
//   {
//     id_salary: "sal_002",
//     id_shelter: "shelter_001",
//     id_employee: "emp_002",
//     name: "April Salary - Alice",
//     cost: 2800000,
//     date: "2025-04-02T10:30:00",
//     note: "Veterinarian",
//     created_at: "2025-04-01T17:30:00",
//     created_by: "admin",
//     updated_at: "2025-04-02T11:00:00",
//     updated_by: "admin",
//   },
//   {
//     id_salary: "sal_003",
//     id_shelter: "shelter_001",
//     id_employee: "emp_003",
//     name: "April Salary - Bob",
//     cost: 2500000,
//     date: "2025-04-03T08:00:00",
//     note: "Caretaker",
//     created_at: "2025-04-02T19:00:00",
//     created_by: "admin",
//     updated_at: "2025-04-03T08:15:00",
//     updated_by: "admin",
//   },
//   {
//     id_salary: "sal_004",
//     id_shelter: "shelter_001",
//     id_employee: "emp_004",
//     name: "April Salary - Sarah",
//     cost: 2700000,
//     date: "2025-04-04T14:20:00",
//     note: "Admin staff",
//     created_at: "2025-04-04T09:00:00",
//     created_by: "admin",
//     updated_at: "2025-04-04T14:45:00",
//     updated_by: "admin",
//   },
//   {
//     id_salary: "sal_005",
//     id_shelter: "shelter_001",
//     id_employee: "emp_005",
//     name: "April Salary - Kevin",
//     cost: 2600000,
//     date: "2025-04-05T12:00:00",
//     note: "Driver",
//     created_at: "2025-04-05T08:20:00",
//     created_by: "admin",
//     updated_at: "2025-04-05T12:15:00",
//     updated_by: "admin",
//   },
//   {
//     id_salary: "sal_006",
//     id_shelter: "shelter_001",
//     id_employee: "emp_006",
//     name: "April Salary - Emma",
//     cost: 3100000,
//     date: "2025-04-06T11:10:00",
//     note: "Operations",
//     created_at: "2025-04-06T09:00:00",
//     created_by: "admin",
//     updated_at: "2025-04-06T11:30:00",
//     updated_by: "admin",
//   },
//   {
//     id_salary: "sal_007",
//     id_shelter: "shelter_001",
//     id_employee: "emp_007",
//     name: "April Salary - Michael",
//     cost: 2950000,
//     date: "2025-04-07T13:45:00",
//     note: "Finance officer",
//     created_at: "2025-04-07T10:15:00",
//     created_by: "admin",
//     updated_at: "2025-04-07T14:00:00",
//     updated_by: "admin",
//   },
// ];
// const Employees = [
//   {
//     id_employee: "emp_001",
//     id_shelter: "shelter_001",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     password: "hashed_password_123", // ganti dengan hash saat insert ke db
//     role: "staff",
//     gender: "Male",
//     shelter_name: "Hope Shelter",
//     phone_number: "081234567890",
//     address: "Jl. Kebajikan No. 12, Jakarta",
//     created_at: "2025-04-01T08:00:00",
//     status: "active",
//   },
//   {
//     id_employee: "emp_002",
//     id_shelter: "shelter_001",
//     name: "Alice Smith",
//     email: "alice.smith@example.com",
//     password: "hashed_password_456",
//     role: "veterinarian",
//     gender: "Female",
//     shelter_name: "Hope Shelter",
//     phone_number: "082233445566",
//     address: "Jl. Mawar No. 45, Bandung",
//     created_at: "2025-04-02T09:30:00",
//     status: "active",
//   },
//   {
//     id_employee: "emp_003",
//     id_shelter: "shelter_001",
//     name: "Michael Lee",
//     email: "michael.lee@example.com",
//     password: "hashed_password_789",
//     role: "finance",
//     gender: "Male",
//     shelter_name: "Hope Shelter",
//     phone_number: "081998877665",
//     address: "Jl. Merdeka No. 8, Surabaya",
//     created_at: "2025-04-03T11:15:00",
//     status: "active",
//   },
// ];
const Expenses = [
  {
    id_expenses: "EXP-003",
    id_shelter: "shelter_001",
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e773",
    id_medical: null,
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T08:20:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T08:50:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-009",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03863",
    id_salary: null,
    created_at: "2025-04-26T09:20:00.000Z",
    created_by: "staff01",
    updated_at: "2025-04-26T09:50:00.000Z",
    updated_by: "staff01",
  },
  {
    id_expenses: "EXP-001",
    id_shelter: "shelter_001",
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e761",
    id_medical: null,
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T08:00:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T08:30:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-014",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_002",
    created_at: "2025-04-26T10:10:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T10:40:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-008",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03862",
    id_salary: null,
    created_at: "2025-04-26T09:10:00.000Z",
    created_by: "staff01",
    updated_at: "2025-04-26T09:40:00.000Z",
    updated_by: "staff01",
  },
  {
    id_expenses: "EXP-020",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: "MEDICAL-001",
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T11:10:00.000Z",
    created_by: "vet01",
    updated_at: "2025-04-26T11:40:00.000Z",
    updated_by: "vet01",
  },
  {
    id_expenses: "EXP-005",
    id_shelter: "shelter_001",
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e775",
    id_medical: null,
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T08:40:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T09:10:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-017",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_005",
    created_at: "2025-04-26T10:40:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T11:10:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-007",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03861",
    id_salary: null,
    created_at: "2025-04-26T09:00:00.000Z",
    created_by: "staff01",
    updated_at: "2025-04-26T09:30:00.000Z",
    updated_by: "staff01",
  },
  {
    id_expenses: "EXP-002",
    id_shelter: "shelter_001",
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e772",
    id_medical: null,
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T08:10:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T08:40:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-018",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_006",
    created_at: "2025-04-26T10:50:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T11:20:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-012",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03866",
    id_salary: null,
    created_at: "2025-04-26T09:50:00.000Z",
    created_by: "staff01",
    updated_at: "2025-04-26T10:20:00.000Z",
    updated_by: "staff01",
  },
  {
    id_expenses: "EXP-006",
    id_shelter: "shelter_001",
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e776",
    id_medical: null,
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T08:50:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T09:20:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-016",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_004",
    created_at: "2025-04-26T10:30:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T11:00:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-021",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: "MEDICAL-002",
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T11:20:00.000Z",
    created_by: "vet01",
    updated_at: "2025-04-26T11:50:00.000Z",
    updated_by: "vet01",
  },
  {
    id_expenses: "EXP-010",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03864",
    id_salary: null,
    created_at: "2025-04-26T09:30:00.000Z",
    created_by: "staff01",
    updated_at: "2025-04-26T10:00:00.000Z",
    updated_by: "staff01",
  },
  {
    id_expenses: "EXP-011",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03865",
    id_salary: null,
    created_at: "2025-04-26T09:40:00.000Z",
    created_by: "staff01",
    updated_at: "2025-04-26T10:10:00.000Z",
    updated_by: "staff01",
  },
  {
    id_expenses: "EXP-004",
    id_shelter: "shelter_001",
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e774",
    id_medical: null,
    id_equipment: null,
    id_salary: null,
    created_at: "2025-04-26T08:30:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T09:00:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-015",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_003",
    created_at: "2025-04-26T10:20:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T10:50:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-013",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_001",
    created_at: "2025-04-26T10:00:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T10:30:00.000Z",
    updated_by: "admin",
  },
  {
    id_expenses: "EXP-019",
    id_shelter: "shelter_001",
    id_food: null,
    id_medical: null,
    id_equipment: null,
    id_salary: "sal_007",
    created_at: "2025-04-26T11:00:00.000Z",
    created_by: "admin",
    updated_at: "2025-04-26T11:30:00.000Z",
    updated_by: "admin",
  },
];
const foods = [
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e761",
    name: "Whiskas1",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e772",
    name: "Whiskas2",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e773",
    name: "Whiskas3",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e774",
    name: "Whiskas4",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e775",
    name: "Whiskas5",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e776",
    name: "Whiskas6",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
];
const equipments = [
  {
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03861",
    name: "Pagar1",
    type: "Beli",
    date: "2025-04-10T07:30:00.000Z",
    cost: 50000,
    note: "Beli untuk kandang baru",
  },
  {
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03862",
    name: "Pagar2",
    type: "Beli",
    date: "2025-04-10T07:30:00.000Z",
    cost: 50000,
    note: "Beli untuk kandang baru",
  },
  {
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03863",
    name: "Pagar3",
    type: "Beli",
    date: "2025-04-10T07:30:00.000Z",
    cost: 50000,
    note: "Beli untuk kandang baru",
  },
  {
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03864",
    name: "Pagar4",
    type: "Beli",
    date: "2025-04-10T07:30:00.000Z",
    cost: 50000,
    note: "Beli untuk kandang baru",
  },
  {
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03865",
    name: "Pagar5",
    type: "Beli",
    date: "2025-04-10T07:30:00.000Z",
    cost: 50000,
    note: "Beli untuk kandang baru",
  },
  {
    id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03866",
    name: "Pagar6",
    type: "Beli",
    date: "2025-04-10T07:30:00.000Z",
    cost: 50000,
    note: "Beli untuk kandang baru",
  },
];
const medicals = [
  {
    id_medical: "MEDICAL-001",
    medical_status: "Sembuh",
    vaccin_status: true,
    medical_date_in: "2025-04-01T08:00:00.000Z",
    medical_date_out: "2025-04-10T08:00:00.000Z",
    medical_cost: 500000,
    note: "Penyakit kulit, sudah sembuh",
    created_at: "2025-04-01T08:10:00.000Z",
    created_by: "vet01",
    updated_at: "2025-04-10T08:30:00.000Z",
    updated_by: "vet01",
    id_shelter: "shelter_001",
    id_animal: "animal_001",
  },
  {
    id_medical: "MEDICAL-002",
    medical_status: "Sakit",
    vaccin_status: false,
    medical_date_in: "2025-04-02T09:00:00.000Z",
    medical_date_out: "2025-04-12T09:00:00.000Z",
    medical_cost: 700000,
    note: "Flu berat, masih pengobatan",
    created_at: "2025-04-02T09:10:00.000Z",
    created_by: "vet02",
    updated_at: "2025-04-12T09:30:00.000Z",
    updated_by: "vet02",
    id_shelter: "shelter_001",
    id_animal: "animal_002",
  },
];
// const finance = {
//   id_finance: "FNC-001",
//   id_shelter: "Shelter01",
//   total_balance: -5000000,
//   created_at: "2025-04-10T07:30:00.000Z",
// };
const user = {
  id_shelter: "SHELTER-f0db8d37-f8a4-42aa-9a34-70d6d0f41850",
  owner_name: "Dimas",
  email: "shelter001@gmail.com",
  shelter_name: "Happy Paws Shelter",
  phone_number: "081238697341",
  address: "jln jalan",
};
//#endregion

export default function FinancePage() {
  //#region Variable
  const itemsPerPage = 5;
  const [Incomes, setIncomes] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [Salaries, setSalaries] = useState([]);
  const [Finance, setFinance] = useState({});
  const [getLoss, setLoss] = useState(0);
  const [getProfit, setProfit] = useState(0);

  const [incomeCurrentPage, setIncomeCurrentPage] = useState(1);
  const [expensesCurrentPage, setExpensesCurrentPage] = useState(1);
  const [salaryCurrentPage, setSalaryCurrentPage] = useState(1);

  const [addIncomeDialogOpen, setAddIncomeDialogOpen] = useState(false);
  const [editIncomeDialogOpen, setEditIncomeDialogOpen] = useState(false);
  const [deleteIncomeDialogOpen, setDeleteIncomeDialogOpen] = useState(false);

  const [addSalaryDialogOpen, setAddSalaryDialogOpen] = useState(false);
  const [deleteSalaryDialogOpen, setDeleteSalaryDialogOpen] = useState(false);

  const [selectedIncome, setSelectedIncome] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);

  const incomeTotalPages = Math.ceil(Incomes.length / itemsPerPage);
  const incomeStartIndex = (incomeCurrentPage - 1) * itemsPerPage;
  const currentIncomes = Incomes.slice(
    incomeStartIndex,
    incomeStartIndex + itemsPerPage
  );
  const expensesTotalPages = Math.ceil(Expenses.length / itemsPerPage);
  const expensesStartIndex = (expensesCurrentPage - 1) * itemsPerPage;
  const currentExpenses = Expenses.slice(
    expensesStartIndex,
    expensesStartIndex + itemsPerPage
  );

  const SalaryTotalPages =
    Salaries && Salaries.length ? Math.ceil(Salaries.length / itemsPerPage) : 1;

  const SalaryStartIndex = (salaryCurrentPage - 1) * itemsPerPage;

  const currentSalaries =
    Salaries && Salaries.length
      ? Salaries.slice(SalaryStartIndex, SalaryStartIndex + itemsPerPage)
      : [];

  const fetchIncomeData = async () => {
    try {
      const incomesRes = await fetch(
        `http://localhost:3000/api/income/getIncome/${user.id_shelter}`
      );
      const incomesData = await incomesRes.json();

      if (!incomesRes.ok || incomesData.error) {
        throw new Error(incomesData.message || "Failed to fetch incomes");
      }
      setIncomes(incomesData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const fetchSalaryData = async () => {
    try {
      const SalaryRes = await fetch(
        `http://localhost:3000/api/salary/getSalary/${user.id_shelter}`
      );
      if (SalaryRes.status === 404) {
        setSalaries(null);
        return;
      }
      const SalaryData = await SalaryRes.json();
      if (!SalaryRes.ok || SalaryData.error) {
        throw new Error(SalaryData.message || "Failed to fetch Salary");
      }

      setSalaries(SalaryData.data?.length ? SalaryData.data : null);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const EmployeeRes = await fetch(
        `http://localhost:3000/api/employees/getEmployeeData/${user.id_shelter}`
      );
      const employeeData = await EmployeeRes.json();

      if (!EmployeeRes.ok || employeeData.error) {
        throw new Error(employeeData.message || "Failed to fetch incomes");
      }
      setEmployees(employeeData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const fetchFinanceData = async () => {
    fetchIncomeData();
    fetchSalaryData();
    try {
      const FinanceRes = await fetch(
        `http://localhost:3000/api/finance/getFinance/${user.id_shelter}`
      );

      const ProfitRes = await fetch(
        `http://localhost:3000/api/finance/getPorfit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_shelter: user.id_shelter,
          }),
        }
      );
      const LossRes = await fetch(`http://localhost:3000/api/finance/getLoss`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_shelter: user.id_shelter,
        }),
      });
      const FinanceData = await FinanceRes.json();

      const ProfitData = await ProfitRes.json();
      const LossData = await LossRes.json();
      if (!FinanceRes.ok || FinanceData.error) {
        throw new Error(FinanceData.message || "Failed to fetch Fiannce");
      }

      if (!ProfitRes.ok || ProfitRes.error) {
        throw new Error(ProfitRes.message || "Failed to fetch Profit");
      }
      if (!LossRes.ok || LossRes.error) {
        throw new Error(LossRes.message || "Failed to fetch Loss");
      }
      setFinance(FinanceData.data?.[0] ?? "No data");
      setLoss(LossData);
      setProfit(ProfitData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchFinanceData();
    fetchIncomeData();
    fetchEmployeeData();
    fetchSalaryData();
  }, []);

  const handleIncomePageChange = (page) => {
    if (page >= 1 && page <= incomeTotalPages) {
      setIncomeCurrentPage(page);
    }
  };
  const handleExpensesPageChange = (page) => {
    if (page >= 1 && page <= expensesTotalPages) {
      setExpensesCurrentPage(page);
    }
  };

  const handleEquipmentPageChange = (page) => {
    if (page >= 1 && page <= SalaryTotalPages) {
      setSalaryCurrentPage(page);
    }
  };

  const handleEditIncomeClick = (food) => {
    setSelectedIncome(food);
    setEditIncomeDialogOpen(true);
  };

  const handleDeleteIncomeClick = (food) => {
    setSelectedIncome(food);
    setDeleteIncomeDialogOpen(true);
  };

  const handleDeleteSalaryClick = (Salary) => {
    setSelectedSalary(Salary);
    setDeleteSalaryDialogOpen(true);
  };
  //#endregion
  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
        <Label className="lg:text-3xl text-2xl font-bold self-start">
          Finance Management
        </Label>
        <div className="w-full flex justify-center items-center ">
          <Card className="lg:min-w-lg w-lg">
            <CardHeader>
              <CardTitle className="text-center">Saldo saat ini</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full justify-center items-center ">
              <Label
                className={`lg:text-3xl text-2xl ${
                  Finance.total_balance < 0 ? "text-red-700" : ""
                }`}
              >
                {typeof Finance.total_balance === "number"
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Finance.total_balance)
                  : Finance.total_balance}
              </Label>
            </CardContent>
            <CardFooter className="flex w-full justify-between items-center ">
              <p className="flex">
                Profit:
                <span className="text-green-600">
                  {" +"}
                  {typeof getProfit === "number"
                    ? new Intl.NumberFormat("id-ID").format(getProfit)
                    : getProfit}
                </span>
              </p>
              <p className="flex">
                Loss:
                <span className="text-red-600">
                  {" -"}
                  {typeof getLoss === "number"
                    ? new Intl.NumberFormat("id-ID").format(getLoss)
                    : getLoss}
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-between items-center w-full">
          <Label className="lg:text-2xl text-xl font-medium">Income</Label>
          <Button
            className="flex items-center gap-1"
            onClick={() => setAddIncomeDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Data
          </Button>
        </div>
        <InsertIncomeDialog
          open={addIncomeDialogOpen}
          onOpenChange={setAddIncomeDialogOpen}
          User={user}
          fetchData={fetchFinanceData}
        />
        <EditIncomeDialog
          open={editIncomeDialogOpen}
          onOpenChange={setEditIncomeDialogOpen}
          incomeData={selectedIncome}
          User={user}
          fetchData={fetchFinanceData}
        />
        <DeleteIncomeDialog
          open={deleteIncomeDialogOpen}
          onOpenChange={setDeleteIncomeDialogOpen}
          income={selectedIncome}
          fetchData={fetchFinanceData}
        />
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentIncomes.map((income, index) => (
                <TableRow key={income.id_income}>
                  <TableCell className="text-center">
                    {incomeStartIndex + index + 1}
                  </TableCell>
                  <TableCell className="text-center">{income.name}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(income.amount)}
                  </TableCell>
                  <TableCell className="text-center">{income.type}</TableCell>
                  <TableCell className="text-center">
                    {new Date(income.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">{income.note}</TableCell>

                  <TableCell className="flex gap-1 justify-center">
                    <Button
                      className="text-sm"
                      variant="success"
                      onClick={() => handleEditIncomeClick(income)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                    <Button
                      className="text-sm"
                      variant="alert"
                      onClick={() => handleDeleteIncomeClick(income)}
                    >
                      <Trash className="size-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full flex justify-start mt-4">
            <Pagination className="w-full">
              <PaginationContent className="justify-start gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handleIncomePageChange(incomeCurrentPage - 1)
                    }
                    className={
                      incomeCurrentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: incomeTotalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={incomeCurrentPage === i + 1}
                      onClick={() => handleIncomePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handleIncomePageChange(incomeCurrentPage + 1)
                    }
                    className={
                      incomeCurrentPage === incomeTotalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <Label className="lg:text-2xl text-xl font-medium">Expenses</Label>
        </div>
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Cost</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Note</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentExpenses.map((exp, index) => {
                let name = "-";
                let cost = "-";
                let type = "-";
                let date = "-";
                let note = "-";

                if (exp.id_salary && Array.isArray(Salaries)) {
                  const salary = Salaries.find(
                    (s) => s.id_salary === exp.id_salary
                  );
                  if (salary) {
                    name = salary.name ?? "-";
                    cost = salary.cost ?? "-";
                    type = "Salary Month";
                    date = salary.date
                      ? new Date(salary.date).toLocaleDateString()
                      : "-";
                    note = salary.note ?? "-";
                  }
                } else if (exp.id_food) {
                  const food = foods.find((f) => f.id_food === exp.id_food);
                  if (food) {
                    name = food.name ?? "-";
                    cost = food.cost ?? "-";
                    type = food.type ?? "-";
                    date = food.date
                      ? new Date(food.date).toLocaleDateString()
                      : "-";
                    note = food.note ?? "-";
                  }
                } else if (exp.id_equipment) {
                  const equipment = equipments.find(
                    (e) => e.id_equipment === exp.id_equipment
                  );
                  if (equipment) {
                    name = equipment.name ?? "-";
                    cost = equipment.cost ?? "-";
                    type = equipment.type ?? "-";
                    date = equipment.date
                      ? new Date(equipment.date).toLocaleDateString()
                      : "-";
                    note = equipment.note ?? "-";
                  }
                } else if (exp.id_medical) {
                  const medical = medicals.find(
                    (m) => m.id_medical === exp.id_medical
                  );
                  if (medical) {
                    name = "MEDICAL";
                    cost = medical.medical_cost ?? "-";
                    type = medical.medical_status ?? "-";
                    date = medical.medical_date_out
                      ? new Date(medical.medical_date_out).toLocaleDateString()
                      : "-";
                    note = medical.note ?? "-";
                  }
                }

                return (
                  <TableRow key={exp.id_expenses}>
                    <TableCell className="text-center">
                      {expensesStartIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-center">{name}</TableCell>
                    <TableCell className="text-center">
                      {typeof cost === "number"
                        ? new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(cost)
                        : cost}
                    </TableCell>
                    <TableCell className="text-center">{type}</TableCell>
                    <TableCell className="text-center">{date}</TableCell>
                    <TableCell className="text-center">{note}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="w-full flex justify-start mt-4">
            <Pagination className="w-full">
              <PaginationContent className="justify-start gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handleExpensesPageChange(expensesCurrentPage - 1)
                    }
                    className={
                      expensesCurrentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: expensesTotalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={expensesCurrentPage === i + 1}
                      onClick={() => handleExpensesPageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handleExpensesPageChange(expensesCurrentPage + 1)
                    }
                    className={
                      expensesCurrentPage === expensesTotalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <Label className="lg:text-2xl text-xl font-medium">
            Employee Salary
          </Label>
          <Button
            className="flex items-center gap-1 "
            onClick={() => setAddSalaryDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Data
          </Button>
        </div>
        <InsertSalaryDialog
          open={addSalaryDialogOpen}
          onOpenChange={setAddSalaryDialogOpen}
          fetchDataSalary={fetchFinanceData}
          User={user}
          EmployeeData={Employees}
        />
        <DeleteSalaryDialog
          open={deleteSalaryDialogOpen}
          onOpenChange={setDeleteSalaryDialogOpen}
          SalaryData={selectedSalary}
          fetchData={fetchFinanceData}
        />
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSalaries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No salary data available
                  </TableCell>
                </TableRow>
              ) : (
                currentSalaries.map((Salary, index) => (
                  <TableRow key={Salary.id_salary}>
                    <TableCell className="text-center">
                      {SalaryStartIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-center">{Salary.name}</TableCell>
                    <TableCell className="text-center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(Salary.cost)}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(Salary.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">{Salary.note}</TableCell>
                    <TableCell className="flex gap-1 justify-center">
                      <Button
                        className="text-sm"
                        variant="alert"
                        onClick={() => handleDeleteSalaryClick(Salary)}
                      >
                        <Trash className="size-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="w-full flex justify-start mt-4">
            <Pagination className="w-full">
              <PaginationContent className="justify-start gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handleEquipmentPageChange(salaryCurrentPage - 1)
                    }
                    className={
                      salaryCurrentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: SalaryTotalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={salaryCurrentPage === i + 1}
                      onClick={() => handleEquipmentPageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handleEquipmentPageChange(salaryCurrentPage + 1)
                    }
                    className={
                      salaryCurrentPage === SalaryTotalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </Layout>
  );
}
