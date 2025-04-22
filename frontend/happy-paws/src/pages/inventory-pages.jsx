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
import { Plus, Pencil, Trash } from "lucide-react";

const foods = [
  {
    id_food: "FOOD-1c4a8f21-a18d-486e-8988-3f229de51e761",
    name: "Whiskas",
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
    name: "Whiskas",
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
    name: "Whiskas",
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
    name: "Whiskas",
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
    name: "Whiskas",
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
    name: "Whiskas",
    quantity: 20,
    category: "Makanan Basah",
    type: "Donasi",
    exp_date: "2025-04-10T07:30:00.000Z",
    cost: 150000,
    date: "2025-04-10T07:30:00.000Z",
    note: "Dikasih orang",
  },
];

function InventoryPages() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(foods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = foods.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
      <Label className="text-3xl font-bold self-start">
        Inventory Management
      </Label>
      <div className="flex justify-between items-center w-full">
        <Label className="text-2xl font-medium">Food</Label>
        <Button
          className="flex items-center gap-2"
          // onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Tambah Data
        </Button>
      </div>
      <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Expired Date</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFoods.map((food, index) => (
              <TableRow key={food.id_food} className="text-center">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.quantity}</TableCell>
                <TableCell>{food.category}</TableCell>
                <TableCell>{food.type}</TableCell>
                <TableCell>
                  {new Date(food.exp_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(food.cost)}
                </TableCell>
                <TableCell>
                  {new Date(food.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{food.note}</TableCell>
                <TableCell>
                  <Button>
                    <Pencil size={16} />
                    Edit
                  </Button>
                  <Button>
                    <Trash size={16} />
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
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rouded-lg shadow-lg w-full max-w-md p-6"></div>
        </div>
      )} */}
    </div>
  );
}

export default InventoryPages;
