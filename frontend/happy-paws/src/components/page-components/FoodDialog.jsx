import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import {
  FoodCategoryCombobox,
  FoodTypeCombobox,
} from "../page-components/FoodCombobox";
import { FoodExpiredDate, FoodDate } from "../page-components/FoodDatepicker";

export function InsertFoodDialog({ open, onOpenChange }) {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Food</DialogTitle>
        </DialogHeader>
        <DialogDescription>Insert new food below.</DialogDescription>
        <div className="grid gap-4 py-4">
          <Input placeholder="Name" name="foodName" />
          <Input placeholder="Quantity" name="foodQuantity" />
          <FoodCategoryCombobox
            className="w-full"
            value={category}
            onChange={setCategory}
          />
          <FoodTypeCombobox
            className="w-full"
            value={type}
            onChange={setType}
          />
          <FoodExpiredDate />
          <Input placeholder="Cost" name="foodCost" />
          <FoodDate />
          <Textarea placeholder="Note" name="foodNote" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
