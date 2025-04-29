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

const medicalData = [
  {
    id_medical: "MED-001",
    medical_status: "Healthy",
    vaccin_status: "Vaccinated",
    medical_date_in: "2025-03-10T00:00:00.000Z",
    medical_date_out: "2025-03-20T00:00:00.000Z",
    medical_cost: 250000,
    note: "Sembuh dari flu ringan",
    created_at: "2025-03-10T00:00:00.000Z",
    created_by: "staff1",
    updated_at: "2025-03-20T00:00:00.000Z",
    updated_by: "staff1",
    id_shelter: "S001",
    id_animal: "A006",
  },
  {
    id_medical: "MED-002",
    medical_status: "Sick",
    vaccin_status: "Not Vaccinated",
    medical_date_in: "2025-04-01T00:00:00.000Z",
    medical_date_out: null,
    medical_cost: 100000,
    note: "Perawatan luka kaki",
    created_at: "2025-04-01T00:00:00.000Z",
    created_by: "staff2",
    updated_at: "2025-04-10T00:00:00.000Z",
    updated_by: "staff2",
    id_shelter: "S001",
    id_animal: "A005",
  },
  {
    id_medical: "MED-003",
    medical_status: "Healthy",
    vaccin_status: "Vaccinated",
    medical_date_in: "2025-02-20T00:00:00.000Z",
    medical_date_out: "2025-03-01T00:00:00.000Z",
    medical_cost: 0,
    note: "Sterilisasi",
    created_at: "2025-02-20T00:00:00.000Z",
    created_by: "admin",
    updated_at: "2025-03-01T00:00:00.000Z",
    updated_by: "admin",
    id_shelter: "S001",
    id_animal: "A004",
  },
  {
    id_medical: "MED-004",
    medical_status: "Sick",
    vaccin_status: "Not Vaccinated",
    medical_date_in: "2025-04-15T00:00:00.000Z",
    medical_date_out: null,
    medical_cost: 200000,
    note: "Infeksi kulit",
    created_at: "2025-04-15T00:00:00.000Z",
    created_by: "staff3",
    updated_at: "2025-04-20T00:00:00.000Z",
    updated_by: "staff3",
    id_shelter: "S001",
    id_animal: "A003",
  },
  {
    id_medical: "MED-005",
    medical_status: "Healthy",
    vaccin_status: "Vaccinated",
    medical_date_in: "2025-03-05T00:00:00.000Z",
    medical_date_out: "2025-03-15T00:00:00.000Z",
    medical_cost: 180000,
    note: "Vaksinasi lengkap",
    created_at: "2025-03-05T00:00:00.000Z",
    created_by: "staff4",
    updated_at: "2025-03-15T00:00:00.000Z",
    updated_by: "staff4",
    id_shelter: "S001",
    id_animal: "A002",
  },
  {
    id_medical: "MED-006",
    medical_status: "Died",
    vaccin_status: "Not Vaccinated",
    medical_date_in: "2025-04-25T00:00:00.000Z",
    medical_date_out: null,
    medical_cost: 120000,
    note: "Meninggal pasca operasi",
    created_at: "2025-04-25T00:00:00.000Z",
    created_by: "staff1",
    updated_at: "2025-04-28T00:00:00.000Z",
    updated_by: "staff1",
    id_shelter: "S001",
    id_animal: "A001",
  },
];

export const AnimalData = [
  { id_animal: "A001", animal_name: "Luna", id_shelter: "S001" },
  { id_animal: "A002", animal_name: "Max", id_shelter: "S001" },
  { id_animal: "A003", animal_name: "Chiko", id_shelter: "S001" },
  { id_animal: "A004", animal_name: "Charlie", id_shelter: "S001" },
  { id_animal: "A005", animal_name: "Bella", id_shelter: "S001" },
  { id_animal: "A006", animal_name: "Rocky", id_shelter: "S001" },
];

export default function MedicalManagement() {
  const itemsPerPage = 5;

  const [medicalCurrentPage, setMedicalCurrentPage] = useState(1);
  const [addMedicalDialogOpen, setAddMedicalDialogOpen] = useState(false);
  const [editMedicalDialogOpen, setEditMedicalDialogOpen] = useState(false);
  const [deleteMedicalDialogOpen, setDeleteMedicalDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vaccineFilter, setVaccineFilter] = useState("");
  const [selectedMedical, setSelectedMedical] = useState(null);

  const getAnimalName = (id_animal, id_shelter) => {
    const animal = AnimalData.find(
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

  useEffect(() => {
    setMedicalCurrentPage(1);
  }, [searchQuery, statusFilter, vaccineFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= medicalTotalPages) {
      setMedicalCurrentPage(page);
    }
  };

  const handleEditMedicalClick = (medical) => {
    console.log("Selected Medical: ", medical);
    setSelectedMedical(medical);
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
        />

        <EditMedicalDialog
          open={editMedicalDialogOpen}
          onOpenChange={setEditMedicalDialogOpen}
          medical={selectedMedical}
        />

        <DeleteMedicalDialog
          open={deleteMedicalDialogOpen}
          onOpenChange={setDeleteMedicalDialogOpen}
          medical={selectedMedical}
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
