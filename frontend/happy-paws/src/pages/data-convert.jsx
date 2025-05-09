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

export default function DataConvert() {
  const itemsPerPage = 5;
  const [animalData, setAnimalData] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [medicalCurrentPage, setMedicalCurrentPage] = useState(1);
  const [animalCurrentPage, setAnimalCurrentPage] = useState(1);
  const [salaryCurrentPage, setSalaryCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState("");

  const currentUser = async () => {
    try {
      const storedUserType = localStorage.getItem("userType");
      const storedUserData = localStorage.getItem("userData");

      if (storedUserType && storedUserData) {
        setUserType(storedUserType);
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error user data", error);
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
    } catch (error) {
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
    } catch (error) {
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
        console.error("Error fetching medical data:", salaryRes.data.error);
      } else {
        setSalaryData(salaryDataFetch.data || []);
      }
    } catch (error) {
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
    if (userData && userData.id_shelter) {
      if (userType === "employee" || userType === "shelter") {
      } else {
        console.warn("Unauthorized user");
      }
    }
  }, [userData]);

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
      }
    }
  }, [selectedDataType, selectedMonth, selectedYear]);

  useEffect(() => {
    setMedicalCurrentPage(1);
    setAnimalCurrentPage(1);
    setSalaryCurrentPage(1);
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
            </SelectContent>
          </Select>

          <Label className="text-md font-medium">Select Month</Label>
          <MonthFilterSelect
            value={selectedMonth}
            onChange={setSelectedMonth}
          />

          <Label className="text-md font-medium">Select Year</Label>
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
                  {currentMedical.map((medical, index) => (
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
                  ))}
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
                  {currentAnimal.map((animal, index) => (
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
                  ))}
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
                  {currentSalary.map((salary, index) => (
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
                  ))}
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

        <Button
          disabled={!selectedDataType}
          onClick={handleExportCSV}
          className="flex items-center gap-2 ml-auto w-full sm:w-auto"
        >
          <FolderSync className="size-4" /> Convert Data
        </Button>
      </div>
    </Layout>
  );
}
