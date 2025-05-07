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
  const [medicalCurrentPage, setMedicalCurrentPage] = useState(1);
  const [convertData, setConvertData] = useState("");
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

  const getAnimalName = (id_animal, id_shelter) => {
    const animal = animalData.find(
      (a) => a.id_animal === id_animal && a.id_shelter === id_shelter
    );
    return animal ? animal.animal_name : "Unknown";
  };

  const medicalTotalPages = Math.ceil(medicalData.length / itemsPerPage);
  const medicalStartIndex = (medicalCurrentPage - 1) * itemsPerPage;
  const currentMedical = medicalData.slice(
    medicalStartIndex,
    medicalStartIndex + itemsPerPage
  );

  const fetchAnimalData = async () => {
    try {
      const animalRes = await axios.get(
        `api/animals/getAnimalData/${userData.id_shelter}`
      );
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
      }
    }
  }, [selectedDataType, selectedMonth, selectedYear]);

  useEffect(() => {
    setMedicalCurrentPage(1);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= medicalTotalPages) {
      setMedicalCurrentPage(page);
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

        <Button
          disabled={!selectedDataType}
          className="flex items-center gap-2 ml-auto w-full sm:w-auto"
        >
          <FolderSync className="size-4" /> Convert Data
        </Button>
      </div>
    </Layout>
  );
}
