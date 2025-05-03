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

// const AnimalData = [
//   {
//     id_animal: "A001",
//     id_shelter: "S001",
//     id_adopter: "ADOPTER-12345678-abcd-1234-abcd-1234567890ab",
//     animal_name: "Luna",
//     animal_img:
//       "https://www.allianz.ie/blog/your-pet/choosing-a-pedigree-pet/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1727944382981/cute-happy-pup.jpeg", // dog
//     animal_gender: "Female",
//     animal_type: "Dog",
//     animal_age: 3,
//     animal_status: "Available",
//     rescue_location: "Jakarta Selatan",
//     date: "2024-12-10T10:00:00",
//     note: "Friendly and calm temperament",
//     created_at: "2024-12-10T10:10:00",
//     created_by: "admin001",
//     updated_at: "2025-01-01T08:00:00",
//     updated_by: "admin001",
//   },
//   {
//     id_animal: "A002",
//     id_shelter: "S002",
//     id_adopter: "ADOPTER-12345678-abcd-1234-abcd-1234567890ab",
//     animal_name: "Max",
//     animal_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjtNVIoesRaukkpGZ5ApIKj4iwk_NHzHTqQ&s", // cat
//     animal_gender: "Male",
//     animal_type: "Cat",
//     animal_age: 2,
//     animal_status: "Adopted",
//     rescue_location: "Bandung",
//     date: "2025-01-05T09:30:00",
//     note: "Playful and sociable",
//     created_at: "2025-01-05T09:40:00",
//     created_by: "admin002",
//     updated_at: "2025-01-20T10:00:00",
//     updated_by: "admin002",
//   },
//   {
//     id_animal: "A003",
//     id_shelter: "S001",
//     id_adopter: null,
//     animal_name: "Chiko",
//     animal_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXU-y5eqvxHM9Jn8Prs6YcL7oyLqTc0YYoBg&s",
//     animal_gender: "Male",
//     animal_type: "Rabbit",
//     animal_age: 1,
//     animal_status: "Available",
//     rescue_location: "Depok",
//     date: "2025-03-15T11:00:00",
//     note: "Loves to be held",
//     created_at: "2025-03-15T11:10:00",
//     created_by: "admin001",
//     updated_at: "2025-03-16T12:00:00",
//     updated_by: "admin001",
//   },
//   {
//     id_animal: "A004",
//     id_shelter: "S003",
//     id_adopter: null,
//     animal_name: "Molly",
//     animal_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3JXXh0WgbF0UY8Tk499nwF8MMkyB9JWxmQ&s", // dog
//     animal_gender: "Female",
//     animal_type: "Dog",
//     animal_age: 5,
//     animal_status: "Available",
//     rescue_location: "Tangerang",
//     date: "2025-02-20T08:00:00",
//     note: "Needs daily walks",
//     created_at: "2025-02-20T08:10:00",
//     created_by: "admin003",
//     updated_at: "2025-03-01T09:00:00",
//     updated_by: "admin003",
//   },
//   {
//     id_animal: "A005",
//     id_shelter: "S002",
//     id_adopter: "ADOPTER-dawn-ioiuby-126666",
//     animal_name: "Shadow",
//     animal_img:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dI-pt8pKDIJS0_OGw0bzEh1nP4tnjzqKiA&s",
//     animal_gender: "Male",
//     animal_type: "Cat",
//     animal_age: 4,
//     animal_status: "Available",
//     rescue_location: "Bekasi",
//     date: "2025-04-01T14:00:00",
//     note: "Quiet and shy at first",
//     created_at: "2025-04-01T14:05:00",
//     created_by: "admin002",
//     updated_at: "2025-04-05T15:00:00",
//     updated_by: "admin002",
//   },
// ];
const user = {
  id_shelter: "SHELTER-79618107-fc06-4adf-bb8a-0e08c95a7f1f",
  owner_name: "Dimas",
  email: "shelter001@gmail.com",
  shelter_name: "Happy Paws Shelter",
  phone_number: "081238697341",
  role: "Owner",
  address: "jln jalan",
};
export default function AdopterManagement() {
  const itemsPerPage = 5;

  const [adopter, setAdopter] = useState([]);
  const [animals, setAnimals] = useState([]);

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
        `http://localhost:3000/api/animals/getAnimalData/${user.id_shelter}`
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
        `http://localhost:3000/api/adopters/getAdopterData/${user.id_shelter}`
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

  useEffect(() => {
    fetchAdopterData();
  }, []);

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
          User={user}
          fetchData={fetchAdopterData}
        />
        <EditAdopterDialog
          open={editAdopterDialogOpen}
          onOpenChange={setEditAdopterDialogOpen}
          AdopterData={selectedAdopter}
          User={user}
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
