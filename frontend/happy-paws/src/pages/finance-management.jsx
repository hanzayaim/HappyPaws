import { useEffect, useMemo, useState } from "react";
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

import axios from "axios";
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
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
// import { useNavigate } from "react-router-dom";
//#region Dummy
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
// const user = {
//   id_shelter: "SHELTER-79618107-fc06-4adf-bb8a-0e08c95a7f1f",
//   owner_name: "Dimas",
//   email: "shelter001@gmail.com",
//   shelter_name: "Happy Paws Shelter",
//   phone_number: "081238697341",
//   address: "jln jalan",
// };
//#endregion
const API_BASE_URL = "http://localhost:3000";
axios.defaults.baseURL = API_BASE_URL;
export default function FinancePage() {
  //#region Variable
  const itemsPerPage = 5;
  const [Incomes, setIncomes] = useState([]);
  const [Expenses, setExpenses] = useState([]);
  const [Salaries, setSalaries] = useState([]);
  const [Finance, setFinance] = useState({});
  const [getLoss, setLoss] = useState(0);
  const [getProfit, setProfit] = useState(0);
  const [Employees, setEmployees] = useState([]);
  const [Foods, setFoods] = useState([]);
  const [Equipments, setEquipments] = useState([]);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  // const navigate = useNavigate();
  const [incomeCurrentPage, setIncomeCurrentPage] = useState(1);
  const [expensesCurrentPage, setExpensesCurrentPage] = useState(1);
  const [salaryCurrentPage, setSalaryCurrentPage] = useState(1);

  const [IncomeSearchQuery, setIncomeSearchQuery] = useState("");
  const [IncomeTypeFilter, setIncomeTypeFilter] = useState("");

  const [SalarySearchQuery, setSalarySearchQuery] = useState("");

  const [addIncomeDialogOpen, setAddIncomeDialogOpen] = useState(false);
  const [editIncomeDialogOpen, setEditIncomeDialogOpen] = useState(false);
  const [deleteIncomeDialogOpen, setDeleteIncomeDialogOpen] = useState(false);

  const [addSalaryDialogOpen, setAddSalaryDialogOpen] = useState(false);
  const [deleteSalaryDialogOpen, setDeleteSalaryDialogOpen] = useState(false);

  const [selectedIncome, setSelectedIncome] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);

  const filteredIncomes = useMemo(() => {
    return Incomes.filter((inc) => {
      const matchesSearch = inc.name
        .toLowerCase()
        .includes(IncomeSearchQuery.toLowerCase());
      const matchesType = !IncomeTypeFilter || inc.type === IncomeTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [Incomes, IncomeSearchQuery, IncomeTypeFilter]);

  const filteredSalary = useMemo(() => {
    return Salaries.filter((salary) => {
      const matchesSearch = salary.name
        .toLowerCase()
        .includes(SalarySearchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [Salaries, SalarySearchQuery]);

  const incomeTotalPages =
    Incomes && Incomes.length
      ? Math.ceil(filteredIncomes.length / itemsPerPage)
      : 1;
  const incomeStartIndex = (incomeCurrentPage - 1) * itemsPerPage;
  const currentIncomes =
    filteredIncomes && filteredIncomes.length
      ? filteredIncomes.slice(incomeStartIndex, incomeStartIndex + itemsPerPage)
      : [];

  const expensesTotalPages =
    Expenses && Expenses.length ? Math.ceil(Expenses.length / itemsPerPage) : 1;
  const expensesStartIndex = (expensesCurrentPage - 1) * itemsPerPage;
  const currentExpenses =
    Expenses && Expenses.length
      ? Expenses.slice(expensesStartIndex, expensesStartIndex + itemsPerPage)
      : [];

  const SalaryTotalPages =
    Salaries && Salaries.length
      ? Math.ceil(filteredSalary.length / itemsPerPage)
      : 1;
  const SalaryStartIndex = (salaryCurrentPage - 1) * itemsPerPage;
  const currentSalaries =
    filteredSalary && filteredSalary.length
      ? filteredSalary.slice(SalaryStartIndex, SalaryStartIndex + itemsPerPage)
      : [];

  const fetchIncomeData = async () => {
    try {
      const incomesRes = await axios.get(
        `/api/income/getIncome/${userData.id_shelter}`
      );
      const incomesData = incomesRes.data;

      if (incomesData.error) {
        throw new Error(incomesData.message || "Failed to fetch incomes");
      }
      setIncomes(incomesData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const fetchExpensesData = async () => {
    try {
      const expensesRes = await axios.get(
        `/api/expenses/getExpenses/${userData.id_shelter}`
      );
      const expensesData = expensesRes.data;

      if (expensesData.error) {
        throw new Error(expensesData.message || "Failed to fetch incomes");
      }
      setExpenses(expensesData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const fetchSalaryData = async () => {
    try {
      const SalaryRes = await axios.get(
        `/api/salary/getSalary/${userData.id_shelter}`
      );
      if (SalaryRes.status === 404) {
        setSalaries(null);
        return;
      }
      const SalaryData = SalaryRes.data;
      if (SalaryData.error) {
        throw new Error(SalaryData.message || "Failed to fetch Salary");
      }

      setSalaries(SalaryData.data?.length ? SalaryData.data : null);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };
  const fetchFoodsData = async () => {
    try {
      const response = await axios.get(
        `/api/food/getFoodData/${userData.id_shelter}`
      );

      const foodsData = response.data;

      if (foodsData.error) {
        throw new Error(foodsData.message || "Failed to fetch foods");
      }

      setFoods(foodsData.data || []);
    } catch (error) {
      console.error("Error fetching food data", error);
    }
  };
  const fetchEquipmentsData = async () => {
    try {
      const equipmentRes = await axios.get(
        `/api/equipment/getEquipmentData/${userData.id_shelter}`
      );
      const equipmentData = equipmentRes.data;

      if (equipmentData.error) {
        throw new Error(equipmentData.message || "Failed to fetch incomes");
      }
      setEquipments(equipmentData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const fetchEmployeeData = async () => {
    try {
      const EmployeeRes = await axios.get(
        `/api/employees/getEmployeeData/${userData.id_shelter}`
      );
      const employeeData = EmployeeRes.data;

      if (employeeData.error) {
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
    fetchExpensesData();
    try {
      const FinanceRes = await axios.get(
        `/api/finance/getFinance/${userData.id_shelter}`
      );
      const ProfitRes = await axios.post(`/api/finance/getPorfit`, {
        id_shelter: userData.id_shelter,
      });
      const LossRes = await axios.post(`/api/finance/getLoss`, {
        id_shelter: userData.id_shelter,
      });
      const FinanceData = FinanceRes.data;
      const ProfitData = ProfitRes.data;
      const LossData = LossRes.data;
      if (FinanceData.error) {
        throw new Error(FinanceData.message || "Failed to fetch Finance");
      }
      if (ProfitData.error) {
        throw new Error(ProfitData.message || "Failed to fetch Profit");
      }
      if (LossData.error) {
        throw new Error(LossData.message || "Failed to fetch Loss");
      }
      setFinance(FinanceData.data?.[0] ?? "No data");
      setLoss(LossData.result ?? 0);
      setProfit(ProfitData.result ?? 0);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const storedUserData = localStorage.getItem("userData");

    if (storedUserType && storedUserData) {
      setUserType(storedUserType);
      setUserData(JSON.parse(storedUserData));
    }
    fetchFinanceData();
    fetchEmployeeData();
    fetchEquipmentsData();
    fetchFoodsData();
  }, []);
  const handleIncomeSearchChange = (e) => {
    setIncomeSearchQuery(e.target.value);
    setIncomeCurrentPage(1);
  };

  const handleIncomeTypeFilterChange = (value) => {
    setIncomeTypeFilter(value);
    setIncomeCurrentPage(1);
  };

  const handleSalarySearchChange = (e) => {
    setSalarySearchQuery(e.target.value);
    setSalaryCurrentPage(1);
  };
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
  const handleEditIncomeClick = (income) => {
    setSelectedIncome(income);
    setEditIncomeDialogOpen(true);
  };
  const handleDeleteIncomeClick = (income) => {
    setSelectedIncome(income);
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
            <CardFooter className="flex lg:flex-row flex-col w-full justify-between items-center ">
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
        <div className="flex lg:flex-row flex-col md:flex-row gap-2 justify-between items-center w-full">
          <div className="flex flex-col lg:flex-row md:flex-row gap-2 min-w-fit justify-start items-center">
            <Label className="lg:text-2xl text-xl font-medium">Income</Label>
            <Input
              type="text"
              placeholder="Search by income name"
              value={IncomeSearchQuery}
              onChange={handleIncomeSearchChange}
              className="md:w-full sm:w-64"
            />

            <Select
              onValueChange={handleIncomeTypeFilterChange}
              value={IncomeTypeFilter}
            >
              <SelectTrigger className="md:w-full sm:w-50">
                <SelectValue placeholder="Filter Income Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                <SelectItem value="Donasi">Donasi</SelectItem>
                <SelectItem value="Non Donasi">Non Donasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          User={userData}
          fetchData={fetchFinanceData}
        />
        <EditIncomeDialog
          open={editIncomeDialogOpen}
          onOpenChange={setEditIncomeDialogOpen}
          incomeData={selectedIncome}
          User={userData}
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
                  const food = Foods.find((f) => f.id_food === exp.id_food);
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
                  const equipment = Equipments.find(
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
          <div className="flex flex-col lg:flex-row md:flex-row gap-2 min-w-fit justify-start items-center">
            <Label className="lg:text-2xl min-w-fit text-xl font-medium">
              Employee Salary
            </Label>
            <Input
              type="text"
              placeholder="Search by Salary name"
              value={SalarySearchQuery}
              onChange={handleSalarySearchChange}
              className="md:w-full sm:w-64"
            />
          </div>
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
          User={userData}
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
