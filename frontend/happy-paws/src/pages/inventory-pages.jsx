import { useEffect, useMemo, useState } from "react";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
import axios from "axios";

// const foods = [
//   {
//     id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e761",
//     name: "Whiskas1",
//     quantity: 20,
//     category: "Dry Food",
//     type: "Donation",
//     exp_date: "2025-04-15T00:00:00.000Z",
//     cost: 150000,
//     date: "2025-04-10T07:30:00.000Z",
//     note: "Dikasih orang",
//     created_at: "2025-04-22T07:37:09.232Z",
//     created_by: "Bima",
//     updated_at: "2025-04-22T07:37:09.232Z",
//     updated_by: "Bima",
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e772",
//     name: "Whiskas2",
//     quantity: 20,
//     category: "Wet Food",
//     type: "Purchase",
//     exp_date: "2025-04-10T07:30:00.000Z",
//     cost: 150000,
//     date: "2025-04-10T07:30:00.000Z",
//     note: "Dikasih orang",
//     created_at: "2025-04-22T07:37:09.232Z",
//     created_by: "Bima",
//     updated_at: "2025-04-22T07:37:09.232Z",
//     updated_by: "Bima",
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e773",
//     name: "Whiskas3",
//     quantity: 20,
//     category: "Dry Food",
//     type: "Donation",
//     exp_date: "2025-04-10T07:30:00.000Z",
//     cost: 150000,
//     date: "2025-04-10T07:30:00.000Z",
//     note: "Dikasih orang",
//     created_at: "2025-04-22T07:37:09.232Z",
//     created_by: "Bima",
//     updated_at: "2025-04-22T07:37:09.232Z",
//     updated_by: "Bima",
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e774",
//     name: "Whiskas4",
//     quantity: 20,
//     category: "Wet Food",
//     type: "Purchase",
//     exp_date: "2025-04-10T07:30:00.000Z",
//     cost: 150000,
//     date: "2025-04-10T07:30:00.000Z",
//     note: "Dikasih orang",
//     created_at: "2025-04-22T07:37:09.232Z",
//     created_by: "Bima",
//     updated_at: "2025-04-22T07:37:09.232Z",
//     updated_by: "Bima",
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e775",
//     name: "Whiskas5",
//     quantity: 20,
//     category: "Dry Food",
//     type: "Donation",
//     exp_date: "2025-04-10T07:30:00.000Z",
//     cost: 150000,
//     date: "2025-04-10T07:30:00.000Z",
//     note: "Dikasih orang",
//     created_at: "2025-04-22T07:37:09.232Z",
//     created_by: "Bima",
//     updated_at: "2025-04-22T07:37:09.232Z",
//     updated_by: "Bima",
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e776",
//     name: "Whiskas6",
//     quantity: 20,
//     category: "Wet Food",
//     type: "Purchase",
//     exp_date: "2025-04-10T07:30:00.000Z",
//     cost: 150000,
//     date: "2025-04-10T07:30:00.000Z",
//     note: "Dikasih orang",
//     created_at: "2025-04-22T07:37:09.232Z",
//     created_by: "Bima",
//     updated_at: "2025-04-22T07:37:09.232Z",
//     updated_by: "Bima",
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
// ];

// const equipments = [
//   {
//     id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03861",
//     name: "Pagar1",
//     type: "Purchase",
//     date: "2025-04-10T07:30:00.000Z",
//     cost: 50000,
//     note: "Beli untuk kandang baru",
//     created_at: "2025-04-24T07:16:33.591Z",
//     created_by: "Bima",
//     updated_at: "2025-04-24T07:16:33.591Z",
//     updated_by: null,
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03862",
//     name: "Pagar2",
//     type: "Donation",
//     date: "2025-04-10T07:30:00.000Z",
//     cost: 50000,
//     note: "Beli untuk kandang baru",
//     created_at: "2025-04-24T07:16:33.591Z",
//     created_by: "Bima",
//     updated_at: "2025-04-24T07:16:33.591Z",
//     updated_by: null,
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03863",
//     name: "Pagar3",
//     type: "Purchase",
//     date: "2025-04-10T07:30:00.000Z",
//     cost: 50000,
//     note: "Beli untuk kandang baru",
//     created_at: "2025-04-24T07:16:33.591Z",
//     created_by: "Bima",
//     updated_at: "2025-04-24T07:16:33.591Z",
//     updated_by: null,
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03864",
//     name: "Pagar4",
//     type: "Donation",
//     date: "2025-04-10T07:30:00.000Z",
//     cost: 50000,
//     note: "Beli untuk kandang baru",
//     created_at: "2025-04-24T07:16:33.591Z",
//     created_by: "Bima",
//     updated_at: "2025-04-24T07:16:33.591Z",
//     updated_by: null,
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03865",
//     name: "Pagar5",
//     type: "Purchase",
//     date: "2025-04-10T07:30:00.000Z",
//     cost: 50000,
//     note: "Beli untuk kandang baru",
//     created_at: "2025-04-24T07:16:33.591Z",
//     created_by: "Bima",
//     updated_at: "2025-04-24T07:16:33.591Z",
//     updated_by: null,
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
//   {
//     id_equipment: "EQUIPMENT-77091e2d-3d4a-4f4b-ba16-0dbcbf3d03866",
//     name: "Pagar6",
//     type: "Donation",
//     date: "2025-04-10T07:30:00.000Z",
//     cost: 50000,
//     note: "Beli untuk kandang baru",
//     created_at: "2025-04-24T07:16:33.591Z",
//     created_by: "Bima",
//     updated_at: "2025-04-24T07:16:33.591Z",
//     updated_by: null,
//     id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f8",
//   },
// ];

// const user = {
//   id_shelter: "SHELTER-79618107-fc06-4adf-bb8a-0e08c95a7f1f",
//   owner_name: "Dimas",
//   email: "shelter001@gmail.com",
//   shelter_name: "Happy Paws Shelter",
//   role: "Owner",
//   phone_number: "081238697341",
//   address: "jln jalan",
// };
export default function InventoryPages() {
  const itemsPerPage = 5;
  const [foods, setFoods] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);

  const [foodCurrentPage, setFoodCurrentPage] = useState(1);
  const [equipmentCurrentPage, setEquipmentCurrentPage] = useState(1);

  const [foodSearchQuery, setFoodSearchQuery] = useState("");
  const [foodCategoryFilter, setFoodCategoryFilter] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("");

  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState("");
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState("");

  const [addFoodDialogOpen, setAddFoodDialogOpen] = useState(false);
  const [editFoodDialogOpen, setEditFoodDialogOpen] = useState(false);
  const [deleteFoodDialogOpen, setDeleteFoodDialogOpen] = useState(false);

  const [addEquipmentDialogOpen, setAddEquipmentDialogOpen] = useState(false);
  const [editEquipmentDialogOpen, setEditEquipmentDialogOpen] = useState(false);
  const [deleteEquipmentDialogOpen, setDeleteEquipmentDialogOpen] =
    useState(false);

  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(foodSearchQuery.toLowerCase());
      const matchesCategory =
        !foodCategoryFilter || food.category === foodCategoryFilter;
      const matchesType = !foodTypeFilter || food.type === foodTypeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [foods, foodSearchQuery, foodCategoryFilter, foodTypeFilter]);

  const filteredEquipments = useMemo(() => {
    return equipments.filter((equipment) => {
      const matchesSearch = equipment.name
        .toLowerCase()
        .includes(equipmentSearchQuery.toLowerCase());
      const matchesType =
        !equipmentTypeFilter || equipment.type === equipmentTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [equipments, equipmentSearchQuery, equipmentTypeFilter]);

  const foodTotalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const foodStartIndex = (foodCurrentPage - 1) * itemsPerPage;
  const currentFoods = filteredFoods.slice(
    foodStartIndex,
    foodStartIndex + itemsPerPage
  );

  const equipmentTotalPages = Math.ceil(
    filteredEquipments.length / itemsPerPage
  );
  const equipmentStartIndex = (equipmentCurrentPage - 1) * itemsPerPage;
  const currentEquipments = filteredEquipments.slice(
    equipmentStartIndex,
    equipmentStartIndex + itemsPerPage
  );

  const fetchFoodsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/food/getFoodData/${userData.id_shelter}`
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
        `http://localhost:3000/api/equipment/getEquipmentData/${userData.id_shelter}`
      );
      const equipmentData = equipmentRes.data;

      if (equipmentData.error) {
        throw new Error(equipmentData.message || "Failed to fetch equipments");
      }
      setEquipments(equipmentData.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
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

  useEffect(() => {
    currentUser();
  }, []);
  useEffect(() => {
    if (userData && userData.id_shelter) {
      if (
        (userType === "employee" && userData?.role === "Finance") ||
        (userType === "shelter" && userData?.role === "Owner") ||
        (userType === "employee" && userData?.role === "Administrator")
      ) {
        fetchEquipmentsData();
        fetchFoodsData();
      }
    }
  }, [userData]);
  const handleFoodSearchChange = (e) => {
    setFoodSearchQuery(e.target.value);
    setFoodCurrentPage(1);
  };

  const handleFoodCategoryFilterChange = (value) => {
    setFoodCategoryFilter(value);
    setFoodCurrentPage(1);
  };

  const handleFoodTypeFilterChange = (value) => {
    setFoodTypeFilter(value);
    setFoodCurrentPage(1);
  };

  const handleEquipmentSearchChange = (e) => {
    setEquipmentSearchQuery(e.target.value);
    setEquipmentCurrentPage(1);
  };

  const handleEquipmentTypeFilterChange = (value) => {
    setEquipmentTypeFilter(value);
    setEquipmentCurrentPage(1);
  };

  const handleFoodPageChange = (page) => {
    if (page >= 1 && page <= foodTotalPages) {
      setFoodCurrentPage(page);
    }
  };

  const handleEquipmentPageChange = (page) => {
    if (page >= 1 && page <= equipmentTotalPages) {
      setEquipmentCurrentPage(page);
    }
  };

  const handleEditFoodClick = (food) => {
    setSelectedFood(food);
    setEditFoodDialogOpen(true);
  };

  const handleDeleteFoodClick = (food) => {
    setSelectedFood(food);
    setDeleteFoodDialogOpen(true);
  };

  const handleEditEquipmentClick = (equipment) => {
    setSelectedEquipment(equipment);
    setEditEquipmentDialogOpen(true);
  };

  const handleDeleteEquipmentClick = (equipment) => {
    setSelectedEquipment(equipment);
    setDeleteEquipmentDialogOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
        <Label className="text-3xl font-bold self-start">
          Inventory Management
        </Label>
        <Label className="text-2xl font-medium">Food</Label>
        <div className="flex flex-col lg:flex-row md:flex-row gap-2 justify-between items-center w-full mt-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              type="text"
              placeholder="Search by food name"
              value={foodSearchQuery}
              onChange={handleFoodSearchChange}
              className="w-full sm:w-64"
            />
            <Select
              onValueChange={handleFoodCategoryFilterChange}
              value={foodCategoryFilter}
            >
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter Food Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                <SelectItem value="Makanan Basah">Makanan Basah</SelectItem>
                <SelectItem value="Makanan Kering">Makanan Kering</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleFoodTypeFilterChange}
              value={foodTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter Food Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                <SelectItem value="Donasi">Donasi</SelectItem>
                <SelectItem value="Beli">Beli</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="flex items-center gap-1"
            onClick={() => setAddFoodDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Data
          </Button>
        </div>
        <InsertFoodDialog
          open={addFoodDialogOpen}
          onOpenChange={setAddFoodDialogOpen}
          User={userData}
          fetchData={fetchFoodsData}
        />
        <EditFoodDialog
          open={editFoodDialogOpen}
          onOpenChange={setEditFoodDialogOpen}
          food={selectedFood}
          User={userData}
          fetchData={fetchFoodsData}
        />
        <DeleteFoodDialog
          open={deleteFoodDialogOpen}
          onOpenChange={setDeleteFoodDialogOpen}
          food={selectedFood}
          fetchData={fetchFoodsData}
        />
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Expired Date</TableHead>
                <TableHead className="text-center">Cost</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFoods.map((food, index) => (
                <TableRow key={food.id_food}>
                  <TableCell className="text-center">
                    {foodStartIndex + index + 1}
                  </TableCell>
                  <TableCell className="text-center">{food.name}</TableCell>
                  <TableCell className="text-center">{food.quantity}</TableCell>
                  <TableCell className="text-center">{food.category}</TableCell>
                  <TableCell className="text-center">{food.type}</TableCell>
                  <TableCell className="text-center">
                    {new Date(food.exp_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(food.cost)}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(food.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">{food.note}</TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button
                      className="text-sm"
                      variant="success"
                      onClick={() => handleEditFoodClick(food)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                    <Button
                      className="text-sm"
                      variant="alert"
                      onClick={() => handleDeleteFoodClick(food)}
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
                    onClick={() => handleFoodPageChange(foodCurrentPage - 1)}
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
                      onClick={() => handleFoodPageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handleFoodPageChange(foodCurrentPage + 1)}
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
        </div>
        <Label className="text-2xl font-medium">Equipment</Label>
        <div className="flex flex-col lg:flex-row gap-2 md:flex-row justify-between items-center w-full mt-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              type="text"
              placeholder="Search by equipment name"
              value={equipmentSearchQuery}
              onChange={handleEquipmentSearchChange}
              className="w-full sm:w-64"
            />
            <Select
              onValueChange={handleEquipmentTypeFilterChange}
              value={equipmentTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter Equipment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All</SelectItem>
                <SelectItem value="Donasi">Donasi</SelectItem>
                <SelectItem value="Beli">Beli</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="flex items-center gap-1"
            onClick={() => setAddEquipmentDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Data
          </Button>
        </div>
        <InsertEquipmentDialog
          open={addEquipmentDialogOpen}
          onOpenChange={setAddEquipmentDialogOpen}
          User={userData}
          fetchData={fetchEquipmentsData}
        />
        <EditEquipmentDialog
          open={editEquipmentDialogOpen}
          onOpenChange={setEditEquipmentDialogOpen}
          equipment={selectedEquipment}
          User={userData}
          fetchData={fetchEquipmentsData}
        />
        <DeleteEquipmentDialog
          open={deleteEquipmentDialogOpen}
          onOpenChange={setDeleteEquipmentDialogOpen}
          equipment={selectedEquipment}
          fetchData={fetchEquipmentsData}
        />
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Cost</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEquipments.map((equipment, index) => (
                <TableRow key={equipment.id_equipment}>
                  <TableCell className="text-center">
                    {equipmentStartIndex + index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {equipment.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {equipment.type}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(equipment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(equipment.cost)}
                  </TableCell>
                  <TableCell className="text-center">
                    {equipment.note}
                  </TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button
                      className="text-sm"
                      variant="success"
                      onClick={() => handleEditEquipmentClick(equipment)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                    <Button
                      className="text-sm"
                      variant="alert"
                      onClick={() => handleDeleteEquipmentClick(equipment)}
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
                      handleEquipmentPageChange(equipmentCurrentPage - 1)
                    }
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
                      onClick={() => handleEquipmentPageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handleEquipmentPageChange(equipmentCurrentPage + 1)
                    }
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
        </div>
      </div>
    </Layout>
  );
}
