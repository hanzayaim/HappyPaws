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

export default function InventoryPages() {
  const itemsPerPage = 5;

  const [foodCurrentPage, setFoodCurrentPage] = useState(1);
  const [equipmentCurrentPage, setEquipmentCurrentPage] = useState(1);

  const [addFoodDialogOpen, setAddFoodDialogOpen] = useState(false);
  const [editFoodDialogOpen, setEditFoodDialogOpen] = useState(false);
  const [deleteFoodDialogOpen, setDeleteFoodDialogOpen] = useState(false);

  const [addEquipmentDialogOpen, setAddEquipmentDialogOpen] = useState(false);
  const [editEquipmentDialogOpen, setEditEquipmentDialogOpen] = useState(false);
  const [deleteEquipmentDialogOpen, setDeleteEquipmentDialogOpen] =
    useState(false);

  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const foodTotalPages = Math.ceil(foods.length / itemsPerPage);
  const foodStartIndex = (foodCurrentPage - 1) * itemsPerPage;
  const currentFoods = foods.slice(
    foodStartIndex,
    foodStartIndex + itemsPerPage
  );

  const equipmentTotalPages = Math.ceil(equipments.length / itemsPerPage);
  const equipmentStartIndex = (equipmentCurrentPage - 1) * itemsPerPage;
  const currentEquipments = equipments.slice(
    equipmentStartIndex,
    equipmentStartIndex + itemsPerPage
  );

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
        <div className="flex justify-between items-center w-full">
          <Label className="text-2xl font-medium">Food</Label>
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
        />
        <EditFoodDialog
          open={editFoodDialogOpen}
          onOpenChange={setEditFoodDialogOpen}
          food={selectedFood}
        />
        <DeleteFoodDialog
          open={deleteFoodDialogOpen}
          onOpenChange={setDeleteFoodDialogOpen}
          food={selectedFood}
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
        <div className="flex justify-between items-center w-full">
          <Label className="text-2xl font-medium">Equipment</Label>
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
        />
        <EditEquipmentDialog
          open={editEquipmentDialogOpen}
          onOpenChange={setEditEquipmentDialogOpen}
          equipment={selectedEquipment}
        />
        <DeleteEquipmentDialog
          open={deleteEquipmentDialogOpen}
          onOpenChange={setDeleteEquipmentDialogOpen}
          equipment={selectedEquipment}
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
