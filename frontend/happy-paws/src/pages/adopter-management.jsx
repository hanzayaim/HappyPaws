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
import { Plus, Pencil, Trash, CircleUser } from "lucide-react";
import Layout from "../app/layout";
import {
  DeleteAdopterDialog,
  EditAdopterDialog,
  InsertAdopterDialog,
} from "../components/pages-components/AdopterDialog";
import { Input } from "../components/ui/input";

import axios from "axios";
import { AlertDialogUser } from "../components/pages-components/AlertDialogUser";
import { useNavigate } from "react-router-dom";
export default function AdopterManagement() {
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [adopter, setAdopter] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [openAlertUser, setOpenAlertUser] = useState(false);

  const [AdopterCurrentPage, setAdopterCurrentPage] = useState(1);
  const [addAdopterDialogOpen, setAddAdopterDialogOpen] = useState(false);
  const [editAdopterDialogOpen, setEditAdopterDialogOpen] = useState(false);
  const [deleteAdopterDialogOpen, setDeleteAdopterDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdopter, setSelectedAdopter] = useState(null);
  const filteredAdopters = adopter.filter(
    (adopter) =>
      adopter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adopter.phone_number.includes(searchQuery)
  );
  const AdopterTotalPages = Math.ceil(filteredAdopters.length / itemsPerPage);
  const AdopterStartIndex = (AdopterCurrentPage - 1) * itemsPerPage;
  const currentAdopters = filteredAdopters.slice(
    AdopterStartIndex,
    AdopterStartIndex + itemsPerPage
  );
  const fetchAnimalData = async () => {
    try {
      const animalRes = await axios.get(
        `/api/animals/getAnimalData/${userData.id_shelter}`
      );
      const animalData = animalRes.data;

      if (animalData.error) {
        throw new Error(animalData.message || "Failed to fetch animal data");
      }
      setAnimals(animalData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchAdopterData = async () => {
    fetchAnimalData();
    try {
      const adopterRes = await axios.get(
        `/api/adopters/getAdopterData/${userData.id_shelter}`
      );
      const adopterData = adopterRes.data;

      if (adopterData.error) {
        throw new Error(adopterData.message || "Failed to fetch adapter data");
      }
      setAdopter(adopterData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
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
  useEffect(() => {
    currentUser();
  }, []);
  useEffect(() => {
    if (userData && userData.id_shelter) {
      if (
        (userType === "employee" && userData?.role === "Administrator") ||
        (userType === "shelter" && userData?.role === "Owner")
      ) {
        fetchAdopterData();
      } else {
        setOpenAlertUser(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    setAdopterCurrentPage(1);
  }, [searchQuery]);
  const handleAdopterPageChange = (page) => {
    if (page >= 1 && page <= AdopterTotalPages) {
      setAdopterCurrentPage(page);
    }
  };

  const handleEditAdopterClick = (Adopter) => {
    setSelectedAdopter(Adopter);
    setEditAdopterDialogOpen(true);
  };

  const handleDeleteAdopterClick = (Adopter) => {
    setSelectedAdopter(Adopter);
    setDeleteAdopterDialogOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
        <Label className="text-3xl font-bold self-start">
          Adopter Management
        </Label>
        <AlertDialogUser
          desc={
            "This feature just can be access by Owner shelter or Admin Employee"
          }
          open={openAlertUser}
          onOpenChange={setOpenAlertUser}
        />
        <div className="flex justify-between gap-2 lg:gap-0 items-center w-full">
          <Input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button
            className="flex items-center gap-1"
            onClick={() => setAddAdopterDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Data
          </Button>
        </div>
        <InsertAdopterDialog
          open={addAdopterDialogOpen}
          onOpenChange={setAddAdopterDialogOpen}
          User={userData}
          fetchData={fetchAdopterData}
        />
        <EditAdopterDialog
          open={editAdopterDialogOpen}
          onOpenChange={setEditAdopterDialogOpen}
          AdopterData={selectedAdopter}
          User={userData}
          fetchData={fetchAdopterData}
        />

        <DeleteAdopterDialog
          open={deleteAdopterDialogOpen}
          onOpenChange={setDeleteAdopterDialogOpen}
          AdopterData={selectedAdopter}
          fetchData={fetchAdopterData}
        />

        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Photo</TableHead>
                <TableHead className="text-center">Phone Number</TableHead>
                <TableHead className="text-center">Gender</TableHead>
                <TableHead className="text-center">Address</TableHead>
                <TableHead className="text-center">Animal</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAdopters.map((Adopter, index) => {
                const adoptedAnimals = animals.filter(
                  (item) => item.id_adopter === Adopter.id_adopter
                );
                return (
                  <TableRow key={Adopter.id_adopter}>
                    <TableCell className="text-center">
                      {AdopterStartIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {Adopter.name}
                    </TableCell>
                    <TableCell className="items-center flex justify-center">
                      <div className="w-24 h-24 border rounded shadow-sm bg-white flex items-center justify-center overflow-hidden">
                        {Adopter.profile_img ? (
                          <img
                            src={`data:image/jpeg;base64,${Adopter.profile_img}`}
                            alt="Adopter Profile"
                            className="lg:max-w-24 lg:max-h-24 object-cover"
                          />
                        ) : (
                          <CircleUser
                            color="#b0b0b0"
                            className="w-16 h-16"
                            strokeWidth={1}
                          />
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      {Adopter.phone_number}
                    </TableCell>
                    <TableCell className="text-center">
                      {Adopter.gender}
                    </TableCell>
                    <TableCell className="text-center">
                      {Adopter.address}
                    </TableCell>
                    <TableCell className="text-center">
                      {adoptedAnimals.length > 0
                        ? adoptedAnimals.map((a, i) => (
                            <div key={i}>{a.animal_name}</div>
                          ))
                        : "No Animal Adopted"}
                    </TableCell>
                    <TableCell>
                      <div className="flex-row gap-1 flex">
                        <Button
                          className="text-sm"
                          variant="success"
                          onClick={() => handleEditAdopterClick(Adopter)}
                        >
                          <Pencil className="size-4" />
                          Edit
                        </Button>
                        <Button
                          className="text-sm"
                          variant="alert"
                          onClick={() => handleDeleteAdopterClick(Adopter)}
                        >
                          <Trash className="size-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
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
                      handleAdopterPageChange(AdopterCurrentPage - 1)
                    }
                    className={
                      AdopterCurrentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: AdopterTotalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={AdopterCurrentPage === i + 1}
                      onClick={() => handleAdopterPageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handleAdopterPageChange(AdopterCurrentPage + 1)
                    }
                    className={
                      AdopterCurrentPage === AdopterTotalPages
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
