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
import { Input } from "../components/ui/input";
import {
  DeleteMedicalDialog,
  EditMedicalDialog,
  InsertMedicalDialog,
} from "../components/pages-components/MedicalDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";

const user = {
  id_shelter: "SHELTER-79618107-fc06-4adf-bb8a-0e08c95a7f1f",
  owner_name: "Dimas",
  email: "shelter001@gmail.com",
  shelter_name: "Happy Paws Shelter",
  phone_number: "081238697341",
  role: "Owner",
  address: "jln jalan",
};

export default function MedicalManagement() {
  const itemsPerPage = 5;
  const [animalData, setAnimalData] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [medicalCurrentPage, setMedicalCurrentPage] = useState(1);
  const [addMedicalDialogOpen, setAddMedicalDialogOpen] = useState(false);
  const [editMedicalDialogOpen, setEditMedicalDialogOpen] = useState(false);
  const [deleteMedicalDialogOpen, setDeleteMedicalDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vaccineFilter, setVaccineFilter] = useState("");
  const [selectedMedical, setSelectedMedical] = useState(null);

  const getAnimalName = (id_animal, id_shelter) => {
    const animal = animalData.find(
      (a) => a.id_animal === id_animal && a.id_shelter === id_shelter
    );
    return animal ? animal.animal_name : "Unknown";
  };

  const filteredMedical = medicalData.filter((medical) => {
    const animalName = getAnimalName(medical.id_animal, medical.id_shelter);
    const matchesSearch = animalName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter
      ? medical.medical_status === statusFilter
      : true;
    const matchesVaccine = vaccineFilter
      ? medical.vaccin_status === vaccineFilter
      : true;
    return matchesSearch && matchesStatus && matchesVaccine;
  });

  const medicalTotalPages = Math.ceil(filteredMedical.length / itemsPerPage);
  const medicalStartIndex = (medicalCurrentPage - 1) * itemsPerPage;
  const currentMedical = filteredMedical.slice(
    medicalStartIndex,
    medicalStartIndex + itemsPerPage
  );

  const fetchAnimalData = async () => {
    try {
      const animalRes = await axios.get(
        `api/animals/getAnimalData/${user.id_shelter}`
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
      const medicalRes = await axios.get(
        `/api/medical/getMedicalData/${user.id_shelter}`
      );

      const medicalDataFetch = medicalRes.data;

      if (medicalDataFetch.error) {
        setMedicalData([]);
        console.error("Error fetching adopter data:", medicalRes.data.error);
      }
      setMedicalData(medicalDataFetch.data || []);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchAnimalData();
    fetchMedicalData();
  }, []);

  useEffect(() => {
    setMedicalCurrentPage(1);
  }, [searchQuery, statusFilter, vaccineFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= medicalTotalPages) {
      setMedicalCurrentPage(page);
    }
  };

  const handleEditMedicalClick = (medical) => {
    const animalName = getAnimalName(medical.id_animal, medical.id_shelter);
    setSelectedMedical({ ...medical, animal_name: animalName });
    setEditMedicalDialogOpen(true);
  };

  const handleDeleteMedicalClick = (medical) => {
    setSelectedMedical(medical);
    setDeleteMedicalDialogOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-screen w-full p-6 bg-gray-50">
        <Label className="text-3xl font-bold self-start">
          Medical Management
        </Label>

        <div className="flex flex-wrap gap-4 items-center justify-between w-full">
          <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search by animal name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64"
            />

            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter Medical Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                <SelectItem value="Healthy">Healthy</SelectItem>
                <SelectItem value="Sick">Sick</SelectItem>
                <SelectItem value="Died">Died</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setVaccineFilter} value={vaccineFilter}>
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter Vaccination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                <SelectItem value="Vaccinated">Vaccinated</SelectItem>
                <SelectItem value="Not Vaccinated">Not Vaccinated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => setAddMedicalDialogOpen(true)}
            className="flex items-center gap-2 ml-auto w-full sm:w-auto"
          >
            <Plus className="size-4" /> Add Data
          </Button>
        </div>

        <InsertMedicalDialog
          open={addMedicalDialogOpen}
          onOpenChange={setAddMedicalDialogOpen}
          User={user}
          fetchData={fetchMedicalData}
          animalData={animalData}
        />

        <EditMedicalDialog
          open={editMedicalDialogOpen}
          onOpenChange={setEditMedicalDialogOpen}
          medical={selectedMedical}
          User={user}
          fetchData={fetchMedicalData}
          animalData={animalData}
        />

        <DeleteMedicalDialog
          open={deleteMedicalDialogOpen}
          onOpenChange={setDeleteMedicalDialogOpen}
          medical={selectedMedical}
          User={user}
          fetchData={fetchMedicalData}
          animalData={animalData}
        />

        <div className="p-4 bg-white rounded shadow-md overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Animal Name</TableHead>
                <TableHead className="text-center">Medical Status</TableHead>
                <TableHead className="text-center">
                  Vaccination Status
                </TableHead>
                <TableHead className="text-center">Medical Date In</TableHead>
                <TableHead className="text-center">Medical Date Out</TableHead>
                <TableHead className="text-center">Medical Cost</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMedical.map((medical, index) => (
                <TableRow key={medical.id_medical}>
                  <TableCell className="text-center">
                    {medicalStartIndex + index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {getAnimalName(medical.id_animal, medical.id_shelter)}
                  </TableCell>
                  <TableCell className="text-center">
                    {medical.medical_status}
                  </TableCell>
                  <TableCell className="text-center">
                    {medical.vaccin_status}
                  </TableCell>
                  <TableCell className="text-center">
                    {medical.medical_date_in
                      ? new Date(medical.medical_date_in).toLocaleDateString()
                      : "No Date"}
                  </TableCell>
                  <TableCell className="text-center">
                    {medical.medical_date_out
                      ? new Date(medical.medical_date_out).toLocaleDateString()
                      : "No Date"}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(medical.medical_cost)}
                  </TableCell>
                  <TableCell className="text-center">{medical.note}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      variant="success"
                      className="text-sm"
                      onClick={() => handleEditMedicalClick(medical)}
                    >
                      <Pencil className="size-4" /> Edit
                    </Button>
                    <Button
                      variant="alert"
                      className="text-sm"
                      onClick={() => handleDeleteMedicalClick(medical)}
                    >
                      <Trash className="size-4" /> Delete
                    </Button>
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
      </div>
    </Layout>
  );
}
