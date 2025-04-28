import { useState } from "react";
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
import {
  InsertFoodDialog,
  EditFoodDialog,
  DeleteFoodDialog,
} from "../components/pages-components/FoodDialog";
import {
  InsertEquipmentDialog,
  EditEquipmentDialog,
  DeleteEquipmentDialog,
} from "../components/pages-components/EquipmentDialog";
import { Plus, Pencil, Trash } from "lucide-react";
import Layout from "../app/layout";
import {
  Card,
  CardContent,
  CardDescription,
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
const Incomes = [
  {
    id_income: "inc_001",
    id_shelter: "shelter_001",
    name: "Donation from John Doe",
    amount: 500.0,
    date: "2025-04-01T10:00:00",
    type: "Donation",
    note: "Monthly support",
    created_at: "2025-04-01T09:50:00",
    created_by: "admin",
    update_at: "2025-04-01T11:00:00",
    update_by: "admin",
  },
  {
    id_income: "inc_002",
    id_shelter: "shelter_001",
    name: "Fundraising Event",
    amount: 1200.0,
    date: "2025-04-03T14:30:00",
    type: "Fundraising",
    note: "Annual charity event",
    created_at: "2025-04-02T18:00:00",
    created_by: "admin",
    update_at: "2025-04-03T15:00:00",
    update_by: "admin",
  },
  {
    id_income: "inc_003",
    id_shelter: "shelter_001",
    name: "Local Government Grant",
    amount: 3000.0,
    date: "2025-04-05T09:00:00",
    type: "Grant",
    note: "Quarterly funding",
    created_at: "2025-04-04T20:00:00",
    created_by: "admin",
    update_at: "2025-04-05T09:30:00",
    update_by: "admin",
  },
  {
    id_income: "inc_004",
    id_shelter: "shelter_001",
    name: "Private Donor Contribution",
    amount: 750.5,
    date: "2025-04-07T11:15:00",
    type: "Donation",
    note: "Anonymous donor",
    created_at: "2025-04-06T10:00:00",
    created_by: "admin",
    update_at: "2025-04-07T11:30:00",
    update_by: "admin",
  },
  {
    id_income: "inc_005",
    id_shelter: "shelter_001",
    name: "Merchandise Sales",
    amount: 250.0,
    date: "2025-04-10T16:00:00",
    type: "Sales",
    note: "Sold T-shirts and mugs",
    created_at: "2025-04-09T12:45:00",
    created_by: "admin",
    update_at: "2025-04-10T17:00:00",
    update_by: "admin",
  },
  {
    id_income: "inc_006",
    id_shelter: "shelter_001",
    name: "Online Campaign",
    amount: 980.25,
    date: "2025-04-12T13:45:00",
    type: "Fundraising",
    note: "Crowdfunding platform",
    created_at: "2025-04-11T14:20:00",
    created_by: "admin",
    update_at: "2025-04-12T14:00:00",
    update_by: "admin",
  },
  {
    id_income: "inc_007",
    id_shelter: "shelter_001",
    name: "Corporate Sponsorship",
    amount: 5000.0,
    date: "2025-04-14T10:30:00",
    type: "Sponsorship",
    note: "Support from XYZ Corp.",
    created_at: "2025-04-13T10:00:00",
    created_by: "admin",
    update_at: "2025-04-14T11:00:00",
    update_by: "admin",
  },
  {
    id_income: "inc_008",
    id_shelter: "shelter_001",
    name: "Pet Adoption Fees",
    amount: 450.0,
    date: "2025-04-16T15:00:00",
    type: "Service Fee",
    note: "5 pet adoptions",
    created_at: "2025-04-15T13:10:00",
    created_by: "admin",
    update_at: "2025-04-16T15:20:00",
    update_by: "admin",
  },
  {
    id_income: "inc_009",
    id_shelter: "shelter_001",
    name: "Workshop Registration",
    amount: 320.0,
    date: "2025-04-18T09:30:00",
    type: "Service Fee",
    note: "Animal care workshop",
    created_at: "2025-04-17T08:40:00",
    created_by: "admin",
    update_at: "2025-04-18T10:00:00",
    update_by: "admin",
  },
  {
    id_income: "inc_010",
    id_shelter: "shelter_001",
    name: "Veterinary Services",
    amount: 670.75,
    date: "2025-04-20T17:20:00",
    type: "Service Fee",
    note: "Vaccination and treatment",
    created_at: "2025-04-19T16:00:00",
    created_by: "admin",
    update_at: "2025-04-20T18:00:00",
    update_by: "admin",
  },
];
const Salaries = [
  {
    id_salary: "sal_001",
    id_shelter: "shelter_001",
    id_employee: "emp_001",
    name: "April Salary - John",
    cost: 3000000,
    date: "2025-04-01T09:00:00",
    note: "Full-time staff",
    created_at: "2025-04-01T08:45:00",
    created_by: "admin",
    updated_at: "2025-04-01T10:00:00",
    updated_by: "admin",
  },
  {
    id_salary: "sal_002",
    id_shelter: "shelter_001",
    id_employee: "emp_002",
    name: "April Salary - Alice",
    cost: 2800000,
    date: "2025-04-02T10:30:00",
    note: "Veterinarian",
    created_at: "2025-04-01T17:30:00",
    created_by: "admin",
    updated_at: "2025-04-02T11:00:00",
    updated_by: "admin",
  },
  {
    id_salary: "sal_003",
    id_shelter: "shelter_001",
    id_employee: "emp_003",
    name: "April Salary - Bob",
    cost: 2500000,
    date: "2025-04-03T08:00:00",
    note: "Caretaker",
    created_at: "2025-04-02T19:00:00",
    created_by: "admin",
    updated_at: "2025-04-03T08:15:00",
    updated_by: "admin",
  },
  {
    id_salary: "sal_004",
    id_shelter: "shelter_001",
    id_employee: "emp_004",
    name: "April Salary - Sarah",
    cost: 2700000,
    date: "2025-04-04T14:20:00",
    note: "Admin staff",
    created_at: "2025-04-04T09:00:00",
    created_by: "admin",
    updated_at: "2025-04-04T14:45:00",
    updated_by: "admin",
  },
  {
    id_salary: "sal_005",
    id_shelter: "shelter_001",
    id_employee: "emp_005",
    name: "April Salary - Kevin",
    cost: 2600000,
    date: "2025-04-05T12:00:00",
    note: "Driver",
    created_at: "2025-04-05T08:20:00",
    created_by: "admin",
    updated_at: "2025-04-05T12:15:00",
    updated_by: "admin",
  },
  {
    id_salary: "sal_006",
    id_shelter: "shelter_001",
    id_employee: "emp_006",
    name: "April Salary - Emma",
    cost: 3100000,
    date: "2025-04-06T11:10:00",
    note: "Operations",
    created_at: "2025-04-06T09:00:00",
    created_by: "admin",
    updated_at: "2025-04-06T11:30:00",
    updated_by: "admin",
  },
  {
    id_salary: "sal_007",
    id_shelter: "shelter_001",
    id_employee: "emp_007",
    name: "April Salary - Michael",
    cost: 2950000,
    date: "2025-04-07T13:45:00",
    note: "Finance officer",
    created_at: "2025-04-07T10:15:00",
    created_by: "admin",
    updated_at: "2025-04-07T14:00:00",
    updated_by: "admin",
  },
];
const Employees = [
  {
    id_employee: "emp_001",
    id_shelter: "shelter_001",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashed_password_123", // ganti dengan hash saat insert ke db
    role: "staff",
    gender: "Male",
    shelter_name: "Hope Shelter",
    phone_number: "081234567890",
    address: "Jl. Kebajikan No. 12, Jakarta",
    created_at: "2025-04-01T08:00:00",
    status: "active",
  },
  {
    id_employee: "emp_002",
    id_shelter: "shelter_001",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "hashed_password_456",
    role: "veterinarian",
    gender: "Female",
    shelter_name: "Hope Shelter",
    phone_number: "082233445566",
    address: "Jl. Mawar No. 45, Bandung",
    created_at: "2025-04-02T09:30:00",
    status: "active",
  },
  {
    id_employee: "emp_003",
    id_shelter: "shelter_001",
    name: "Michael Lee",
    email: "michael.lee@example.com",
    password: "hashed_password_789",
    role: "finance",
    gender: "Male",
    shelter_name: "Hope Shelter",
    phone_number: "081998877665",
    address: "Jl. Merdeka No. 8, Surabaya",
    created_at: "2025-04-03T11:15:00",
    status: "active",
  },
];
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
const finance = {
  id_finance: "FNC-001",
  id_shelter: "Shelter01",
  total_balance: -5000000,
  created_at: "2025-04-10T07:30:00.000Z",
};
//#endregion

export default function FinancePage() {
  //#region Variable
  const itemsPerPage = 5;

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

  const SalaryTotalPages = Math.ceil(Salaries.length / itemsPerPage);
  const SalaryStartIndex = (salaryCurrentPage - 1) * itemsPerPage;
  const currentSalaries = Salaries.slice(
    SalaryStartIndex,
    SalaryStartIndex + itemsPerPage
  );

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
                  finance.total_balance < 0 ? "text-red-700" : ""
                }`}
              >
                {typeof finance.total_balance === "number"
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(finance.total_balance)
                  : finance.total_balance}
              </Label>
            </CardContent>
            <CardFooter className="flex w-full justify-between items-center ">
              <p>Profit:</p>
              <p>Cost:</p>
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
        />
        <EditIncomeDialog
          open={editIncomeDialogOpen}
          onOpenChange={setEditIncomeDialogOpen}
          incomeData={selectedIncome}
        />
        <DeleteIncomeDialog
          open={deleteIncomeDialogOpen}
          onOpenChange={setDeleteIncomeDialogOpen}
          food={selectedIncome}
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
                <TableHead className="text-center">Updated By</TableHead>
                <TableHead className="text-center">Updated Date</TableHead>
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
                  <TableCell className="text-center">
                    {income.update_by}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(income.update_at).toLocaleDateString()}
                  </TableCell>
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

                if (exp.id_salary) {
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
          EmployeeData={Employees}
        />
        <DeleteSalaryDialog
          open={deleteSalaryDialogOpen}
          onOpenChange={setDeleteSalaryDialogOpen}
          SalaryData={selectedSalary}
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
                <TableHead className="text-center">Updated By</TableHead>
                <TableHead className="text-center">Updated At</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSalaries.map((Salary, index) => (
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
                  <TableCell className="text-center">
                    {Salary.updated_by}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(Salary.updated_at).toLocaleDateString()}
                  </TableCell>
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
              ))}
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
