import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FoodCombobox } from "../components/page-components/food-combobox";

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

export default function InventoryPages() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(foods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = foods.slice(startIndex, startIndex + itemsPerPage);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
      <Label className="text-3xl font-bold self-start">
        Inventory Management
      </Label>
      <div className="flex justify-between items-center w-full">
        <Label className="text-2xl font-medium">Food</Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="size-4" />
              Add Data
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Food</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Insert new food below.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <Input placeholder="Name" name="foodName" />
              <Input
                placeholder="Quantity"
                name="foodQuantity"
              />
              <FoodCombobox
              category={category}
              setCategory={setCategory}
              type={type}
              setType={setType}
              />
              <Input placeholder="Cost" name="foodCost" />
              <Textarea
                placeholder="Note"
                name="foodNote"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick="">Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
                <TableCell className="text-center">{index + 1}</TableCell>
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
                  <Button className="text-sm" variant="success">
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                  <Button className="text-sm" variant="alert">
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
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
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
  );
}