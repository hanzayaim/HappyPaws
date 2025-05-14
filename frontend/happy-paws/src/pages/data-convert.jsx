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
import { FolderSync } from "lucide-react";
import Layout from "../app/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";
import {
  MonthFilterSelect,
  YearFilterSelect,
} from "../components/pages-components/Select-Month-Year";
import { useNavigate } from "react-router-dom";

export default function DataConvert() {
  const itemsPerPage = 5;
  const [animalData, setAnimalData] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [medicalCurrentPage, setMedicalCurrentPage] = useState(1);
  const [animalCurrentPage, setAnimalCurrentPage] = useState(1);
  const [salaryCurrentPage, setSalaryCurrentPage] = useState(1);
  const [expensesCurrentPage, setExpensesCurrentPage] = useState(1);
  const [incomeCurrentPage, setIncomeCurrentPage] = useState(1);
  const [equipmentCurrentPage, setEquipmentCurrentPage] = useState(1);
  const [foodCurrentPage, setFoodCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState("");
  const [checkFetchedData, setCheckFetchedData] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();
  const currentUser = async () => {
    try {
      const response = await axios.get("/api/auth/profile", {
        withCredentials: true,
      });
      if (response) {
        setUserType(response.data.userType);
        setUserData(response.data.profile);
      }
    } catch (error) {
      console.error("Error user data", error);
      navigate("/login");
    }
  };

  const medicalTotalPages = Math.ceil(medicalData.length / itemsPerPage);
  const medicalStartIndex = (medicalCurrentPage - 1) * itemsPerPage;
  const currentMedical = medicalData.slice(
    medicalStartIndex,
    medicalStartIndex + itemsPerPage
  );

  const animalTotalPages = Math.ceil(animalData.length / itemsPerPage);
  const animalStartIndex = (animalCurrentPage - 1) * itemsPerPage;
  const currentAnimal = animalData.slice(
    animalStartIndex,
    animalStartIndex + itemsPerPage
  );

  const salaryTotalPages = Math.ceil(salaryData.length / itemsPerPage);
  const salaryStartIndex = (salaryCurrentPage - 1) * itemsPerPage;
  const currentSalary = salaryData.slice(
    salaryStartIndex,
    salaryStartIndex + itemsPerPage
  );

  const expensesTotalPages = Math.ceil(expensesData.length / itemsPerPage);
  const expensesStartIndex = (expensesCurrentPage - 1) * itemsPerPage;
  const currentExpenses = expensesData.slice(
    expensesStartIndex,
    expensesStartIndex + itemsPerPage
  );

  const incomeTotalPages = Math.ceil(incomeData.length / itemsPerPage);
  const incomeStartIndex = (incomeCurrentPage - 1) * itemsPerPage;
  const currentIncome = incomeData.slice(
    incomeStartIndex,
    incomeStartIndex + itemsPerPage
  );

  const equipmentTotalPages = Math.ceil(equipmentData.length / itemsPerPage);
  const equipmentStartIndex = (equipmentCurrentPage - 1) * itemsPerPage;
  const currentEquipment = equipmentData.slice(
    equipmentStartIndex,
    equipmentStartIndex + itemsPerPage
  );

  const foodTotalPages = Math.ceil(foodData.length / itemsPerPage);
  const foodStartIndex = (foodCurrentPage - 1) * itemsPerPage;
  const currentFood = foodData.slice(
    foodStartIndex,
    foodStartIndex + itemsPerPage
  );

  const fetchAnimalData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const animalRes = await axios.post(`/api/animals/getAnimalDataConvert`, {
        id_shelter: userData.id_shelter,
        month,
        year,
      });

      const animalDataFetch = animalRes.data;
      if (animalDataFetch.error) {
        throw new Error(
          animalDataFetch.message || "Failed to fetch animal data"
        );
      }
      setAnimalData(animalDataFetch.data || []);
      setCheckFetchedData(animalDataFetch.data || []);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const fetchMedicalData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const medicalRes = await axios.post(
        `/api/medical/getMedicalDataConvert`,
        {
          id_shelter: userData.id_shelter,
          month,
          year,
        }
      );

      const medicalDataFetch = medicalRes.data;

      if (medicalDataFetch.error) {
        setMedicalData([]);
        console.error("Error fetching medical data:", medicalRes.data.error);
      } else {
        setMedicalData(medicalDataFetch.data || []);
      }
      setCheckFetchedData(medicalDataFetch.data);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const fetchSalaryData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const salaryRes = await axios.post(`/api/salary/getSalaryDataConvert`, {
        id_shelter: userData.id_shelter,
        month,
        year,
      });

      const salaryDataFetch = salaryRes.data;

      if (salaryDataFetch.error) {
        setSalaryData([]);
        console.error("Error fetching salary data:", salaryRes.data.error);
      } else {
        setSalaryData(salaryDataFetch.data || []);
      }
      setCheckFetchedData(salaryDataFetch.data);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const fetchExpensesData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const expensesRes = await axios.post(
        `/api/expenses/getExpensesDataConvert`,
        {
          id_shelter: userData.id_shelter,
          month,
          year,
        }
      );

      const expensesDataFetch = expensesRes.data;

      if (expensesDataFetch.error) {
        setExpensesData([]);
        console.error("Error fetching expenses data:", expensesRes.data.error);
      } else {
        setExpensesData(expensesDataFetch.data || []);
      }
      setCheckFetchedData(expensesDataFetch.data);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const fetchIncomeData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const incomeRes = await axios.post(`/api/income/getIncomeDataConvert`, {
        id_shelter: userData.id_shelter,
        month,
        year,
      });

      const incomeDataFetch = incomeRes.data;

      if (incomeDataFetch.error) {
        setIncomeData([]);
        console.error("Error fetching Income data:", incomeRes.data.error);
      } else {
        setIncomeData(incomeDataFetch.data || []);
      }
      setCheckFetchedData(incomeDataFetch.data);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const fetchEquipmentData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const equipmentRes = await axios.post(
        `/api/equipment/getEquipmentDataConvert`,
        {
          id_shelter: userData.id_shelter,
          month,
          year,
        }
      );

      const equipmentDataFetch = equipmentRes.data;

      if (equipmentDataFetch.error) {
        setEquipmentData([]);
        console.error("Error fetching food data:", equipmentRes.data.error);
      } else {
        setEquipmentData(equipmentDataFetch.data || []);
      }
      setCheckFetchedData(equipmentDataFetch.data);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const fetchFoodData = async () => {
    try {
      const month = selectedMonth === "all" ? null : selectedMonth;
      const year = selectedYear === "all" ? null : selectedYear;

      const foodRes = await axios.post(`/api/food/getFoodDataConvert`, {
        id_shelter: userData.id_shelter,
        month,
        year,
      });

      const foodDataFetch = foodRes.data;

      if (foodDataFetch.error) {
        setFoodData([]);
        console.error("Error fetching food data:", foodRes.data.error);
      } else {
        setFoodData(foodDataFetch.data || []);
      }
      setCheckFetchedData(foodDataFetch.data);
    } catch (error) {
      setFetchError(true);
      console.error("error fetching data", error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await axios.post(
        "/api/export/export-csv",
        {
          id_shelter: userData.id_shelter,
          month: selectedMonth,
          year: selectedYear,
          triggerValue: selectedDataType,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Export_${selectedDataType}_${selectedMonth}_${selectedYear}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    if (userData && userData.id_shelter && selectedDataType) {
      if (userType === "employee" || userType === "shelter") {
        if (selectedDataType === "medical") {
          fetchMedicalData();
        }
        if (selectedDataType === "animal") {
          fetchAnimalData();
        }
        if (selectedDataType === "salary") {
          fetchSalaryData();
        }
        if (selectedDataType === "expenses") {
          fetchExpensesData();
        }
        if (selectedDataType === "income") {
          fetchIncomeData();
        }
        if (selectedDataType === "equipment") {
          fetchEquipmentData();
        }
        if (selectedDataType === "food") {
          fetchFoodData();
        }
      }
    }
  }, [selectedDataType, selectedMonth, selectedYear]);

  useEffect(() => {
    setMedicalCurrentPage(1);
    setAnimalCurrentPage(1);
    setSalaryCurrentPage(1);
    setExpensesCurrentPage(1);
    setIncomeCurrentPage(1);
    setEquipmentCurrentPage(1);
    setFoodCurrentPage(1);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= medicalTotalPages) {
      setMedicalCurrentPage(page);
    }
    if (page >= 1 && page <= animalTotalPages) {
      setAnimalCurrentPage(page);
    }
    if (page >= 1 && page <= salaryTotalPages) {
      setSalaryCurrentPage(page);
    }
    if (page >= 1 && page <= expensesTotalPages) {
      setExpensesCurrentPage(page);
    }
    if (page >= 1 && page <= incomeTotalPages) {
      setIncomeCurrentPage(page);
    }
    if (page >= 1 && page <= equipmentTotalPages) {
      setEquipmentCurrentPage(page);
    }
    if (page >= 1 && page <= foodTotalPages) {
      setFoodCurrentPage(page);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-screen w-full p-6 bg-gray-50">
        <Label className="text-3xl font-bold self-start">Data Convert</Label>

        <div className="flex flex-col gap-4 w-full sm:w-auto">
          <Label className="text-md font-medium">Select Data</Label>
          <Select onValueChange={(value) => setSelectedDataType(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose data type" />
            </SelectTrigger>
            <SelectContent>
              {["Medical", "Owner"].includes(userData?.role) && (
                <SelectItem value="medical">Medical</SelectItem>
              )}
              <SelectItem value="animal">Animal</SelectItem>
              {["Finance", "Owner"].includes(userData?.role) && (
                <SelectItem value="salary">Salary</SelectItem>
              )}
              {["Finance", "Owner"].includes(userData?.role) && (
                <SelectItem value="expenses">Expenses</SelectItem>
              )}
              {["Finance", "Owner"].includes(userData?.role) && (
                <SelectItem value="income">Income</SelectItem>
              )}
              {["Administrator", "Owner"].includes(userData?.role) && (
                <SelectItem value="equipment">Equipment</SelectItem>
              )}
              {["Administrator", "Owner"].includes(userData?.role) && (
                <SelectItem value="food">Food</SelectItem>
              )}
            </SelectContent>
          </Select>

          <Label className="text-md font-medium">
            Select Month
            <p className="text-xs text-red-500">(Filtered by Created At)</p>
          </Label>
          <MonthFilterSelect
            value={selectedMonth}
            onChange={setSelectedMonth}
          />

          <Label className="text-md font-medium">
            Select Year{" "}
            <p className="text-xs text-red-500">(Filtered by Created At)</p>
          </Label>
          <YearFilterSelect value={selectedYear} onChange={setSelectedYear} />
        </div>

        {selectedDataType === "medical" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Animal Name</TableHead>
                    <TableHead className="text-center">
                      Medical Status
                    </TableHead>
                    <TableHead className="text-center">
                      Vaccination Status
                    </TableHead>
                    <TableHead className="text-center">
                      Medical Date In
                    </TableHead>
                    <TableHead className="text-center">
                      Medical Date Out
                    </TableHead>
                    <TableHead className="text-center">Medical Cost</TableHead>
                    <TableHead className="text-center">Note</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMedical.length === 0 ? (
                    <TableRow className="justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No Medical data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentMedical.map((medical, index) => (
                      <TableRow key={medical.id_medical}>
                        <TableCell className="text-center">
                          {medicalStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.animal_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.medical_status}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.vaccin_status}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.medical_date_in
                            ? new Date(
                                medical.medical_date_in
                              ).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.medical_date_out
                            ? new Date(
                                medical.medical_date_out
                              ).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(medical.medical_cost)}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.note}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.created_at
                            ? new Date(medical.created_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {medical.created_at ? medical.created_by : "Unkown"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(medicalCurrentPage - 1)}
                      className={
                        medicalCurrentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: medicalTotalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={medicalCurrentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(medicalCurrentPage + 1)}
                      className={
                        medicalCurrentPage === medicalTotalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        {selectedDataType === "animal" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Animal Name</TableHead>
                    <TableHead className="text-center">Animal Gender</TableHead>
                    <TableHead className="text-center">Animal Type</TableHead>
                    <TableHead className="text-center">
                      Rescue Location
                    </TableHead>
                    <TableHead className="text-center">Date In</TableHead>
                    <TableHead className="text-center">Note</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAnimal.length === 0 ? (
                    <TableRow className="justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No Animal data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentAnimal.map((animal, index) => (
                      <TableRow key={animal.id_animal}>
                        <TableCell className="text-center">
                          {animalStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.animal_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.animal_gender}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.animal_type}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.rescue_location}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.date
                            ? new Date(animal.date).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.note}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.created_at
                            ? new Date(animal.created_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {animal.created_by ? animal.created_by : "Unkown"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(animalCurrentPage - 1)}
                      className={
                        animalCurrentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: animalTotalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={animalCurrentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(animalCurrentPage + 1)}
                      className={
                        animalCurrentPage === animalTotalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        {selectedDataType === "salary" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Employee Name</TableHead>
                    <TableHead className="text-center">Salary Name</TableHead>
                    <TableHead className="text-center">Cost</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Note</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                    <TableHead className="text-center">Updated At</TableHead>
                    <TableHead className="text-center">Updated By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSalary.length === 0 ? (
                    <TableRow className="justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No salary data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentSalary.map((salary, index) => (
                      <TableRow key={`${salary.id_salary}-${index}`}>
                        <TableCell className="text-center">
                          {salaryStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.s_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(salary.cost)}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.date
                            ? new Date(salary.date).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.note}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.created_at
                            ? new Date(salary.created_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.created_by ? salary.created_by : "Unkown"}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.updated_at
                            ? new Date(salary.updated_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {salary.updated_by ? salary.updated_by : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(salaryCurrentPage - 1)}
                      className={
                        salaryCurrentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: salaryTotalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={salaryCurrentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(salaryCurrentPage + 1)}
                      className={
                        salaryCurrentPage === salaryTotalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        {selectedDataType === "expenses" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Expenses Name</TableHead>
                    <TableHead className="text-center">Cost</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentExpenses.length === 0 ? (
                    <TableRow className="justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No Expenses data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentExpenses.map((expenses, index) => (
                      <TableRow key={`${expenses.id_expenses}-${index}`}>
                        <TableCell className="text-center">
                          {expensesStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {expenses.expenses_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(expenses.expenses_cost)}
                        </TableCell>
                        <TableCell className="text-center">
                          {expenses.created_at
                            ? new Date(expenses.created_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {expenses.created_by ? expenses.created_by : "Unkown"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(expensesCurrentPage - 1)}
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
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(expensesCurrentPage + 1)}
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
          </>
        )}

        {selectedDataType === "income" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Income Name</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Note</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                    <TableHead className="text-center">Updated At</TableHead>
                    <TableHead className="text-center">Updated By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentIncome.length === 0 ? (
                    <TableRow className="w-full justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No Income data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentIncome.map((income, index) => (
                      <TableRow key={`${income.id_income}-${index}`}>
                        <TableCell className="text-center">
                          {incomeStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(income.amount)}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.type}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.date
                            ? new Date(income.date).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.note}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.created_at
                            ? new Date(income.created_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.created_by ? income.created_by : "Unkown"}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.update_at
                            ? new Date(income.update_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {income.update_by ? income.update_by : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(incomeCurrentPage - 1)}
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
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(incomeCurrentPage + 1)}
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
          </>
        )}

        {selectedDataType === "equipment" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">
                      Equipment Name
                    </TableHead>
                    <TableHead className="text-center">Cost</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">
                      Purchase / Donation Date
                    </TableHead>
                    <TableHead className="text-center">Note</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                    <TableHead className="text-center">Updated At</TableHead>
                    <TableHead className="text-center">Updated By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEquipment.length === 0 ? (
                    <TableRow className="justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No Equipment data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentEquipment.map((equipment, index) => (
                      <TableRow key={`${equipment.id_equipment}-${index}`}>
                        <TableCell className="text-center">
                          {equipmentStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(equipment.cost)}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.type}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.purchase_or_donation_date
                            ? new Date(
                                equipment.purchase_or_donation_date
                              ).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.note}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.created_at
                            ? new Date(
                                equipment.created_at
                              ).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.created_by
                            ? equipment.created_by
                            : "Unkown"}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.update_at
                            ? new Date(equipment.update_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {equipment.update_by ? equipment.update_by : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(equipmentCurrentPage - 1)}
                      className={
                        equipmentCurrentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: equipmentTotalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={equipmentCurrentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(equipmentCurrentPage + 1)}
                      className={
                        equipmentCurrentPage === equipmentTotalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        {selectedDataType === "food" && (
          <>
            <div className="p-4 bg-white rounded shadow-md overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">No</TableHead>
                    <TableHead className="text-center">Food Name</TableHead>
                    <TableHead className="text-center">Cost</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">
                      Purchase / Donation Date
                    </TableHead>
                    <TableHead className="text-center">Expired Date</TableHead>
                    <TableHead className="text-center">Note</TableHead>
                    <TableHead className="text-center">Created At</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                    <TableHead className="text-center">Updated At</TableHead>
                    <TableHead className="text-center">Updated By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentFood.length === 0 ? (
                    <TableRow className="justify-center items-center">
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No Food data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentFood.map((food, index) => (
                      <TableRow key={`${food.id_food}-${index}`}>
                        <TableCell className="text-center">
                          {foodStartIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(food.cost)}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.type}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.purchase_or_donation_date
                            ? new Date(
                                food.purchase_or_donation_date
                              ).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.expired_date
                            ? new Date(food.expired_date).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.note}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.created_at
                            ? new Date(food.created_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.created_by ? food.created_by : "Unkown"}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.update_at
                            ? new Date(food.update_at).toLocaleDateString()
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-center">
                          {food.update_by ? food.update_by : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination className="w-full flex justify-center mt-4">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(foodCurrentPage - 1)}
                      className={
                        foodCurrentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: foodTotalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={foodCurrentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(foodCurrentPage + 1)}
                      className={
                        foodCurrentPage === foodTotalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

        <Button
          disabled={
            !selectedDataType ||
            fetchError ||
            !checkFetchedData ||
            checkFetchedData.length === 0
          }
          onClick={handleExportCSV}
          className="flex items-center gap-2 ml-auto w-full sm:w-auto"
        >
          <FolderSync className="size-4" /> Convert Data
        </Button>
      </div>
    </Layout>
  );
}
