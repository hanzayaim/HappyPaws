import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FoodCategoryCombobox, FoodTypeCombobox } from "./FoodCombobox";
import { FoodExpiredDate, FoodDate } from "./FoodDatepicker";
import { Label } from "../ui/label";

const foodSchema = z.object({
  foodName: z.string().min(1, "Name is required"),
  foodQuantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  foodCost: z.coerce
    .number()
    .min(0, "Cost must be 0 or more")
    .or(z.literal("").transform(() => 0)),
  foodNote: z.string().optional(),
  foodCategory: z.string().min(1, "Category is required"),
  foodType: z.string().min(1, "Type is required"),
  foodExpiredDate: z
    .date({ required_error: "Expired date is required" })
    .nullable()
    .refine((data) => data !== null, {
      message: "Expired date is required",
    }),
  foodDate: z
    .date({ required_error: "Date is required" })
    .nullable()
    .refine((data) => data !== null, {
      message: "Expired date is required",
    }),
});

export function InsertFoodDialog({ open, onOpenChange }) {
  const [foodCategory, setFoodCategory] = useState("");
  const [foodType, setFoodType] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      foodName: "",
      foodQuantity: "",
      foodCost: "",
      foodNote: "",
      foodCategory: "",
      foodType: "",
      foodExpiredDate: new Date(),
      foodDate: new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
  };

  const handleFoodCategoryChange = (value) => {
    setFoodCategory(value);
    setValue("foodCategory", value);
  };

  const handleFoodTypeChange = (value) => {
    setFoodType(value);
    setValue("foodType", value);
  };

  useEffect(() => {
    if (!open) {
      reset();
      setFoodCategory("");
      setFoodType("");
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Insert new food below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input placeholder="Input Name..." {...register("foodName")} />
              {errors.foodName && (
                <p className="text-destructive text-sm">
                  {errors.foodName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                step="1"
                min="1"
                placeholder="Input Quantity..."
                {...register("foodQuantity")}
              />
              {errors.foodQuantity && (
                <p className="text-destructive text-sm">
                  {errors.foodQuantity.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <FoodCategoryCombobox
                className="w-full"
                value={foodCategory}
                onChange={handleFoodCategoryChange}
              />
              {errors.foodCategory && (
                <p className="text-destructive text-sm">
                  {errors.foodCategory.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <FoodTypeCombobox
                className="w-full"
                value={foodType}
                onChange={handleFoodTypeChange}
              />
              {errors.foodType && (
                <p className="text-destructive text-sm">
                  {errors.foodType.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Expired Date</Label>
              <Controller
                control={control}
                name="foodExpiredDate"
                render={({ field }) => (
                  <FoodExpiredDate
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.foodExpiredDate && (
                <p className="text-destructive text-sm">
                  {errors.foodExpiredDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cost</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Cost"
                {...register("foodCost")}
              />
              {errors.foodCost && (
                <p className="text-destructive text-sm">
                  {errors.foodCost.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Controller
                control={control}
                name="foodDate"
                render={({ field }) => (
                  <FoodDate value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.foodDate && (
                <p className="text-destructive text-sm">
                  {errors.foodDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea placeholder="Input Note..." {...register("foodNote")} />
              {errors.foodNote && (
                <p className="text-destructive text-sm">
                  {errors.foodNote.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditFoodDialog({ open, onOpenChange, food }) {
  const [foodCategory, setFoodCategory] = useState("");
  const [foodType, setFoodType] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      foodName: "",
      foodQuantity: "",
      foodCost: "",
      foodNote: "",
      foodCategory: "",
      foodType: "",
      foodExpiredDate: null,
      foodDate: null,
    },
  });

  useEffect(() => {
    if (food && open) {
      reset({
        foodName: food.name,
        foodQuantity: food.quantity,
        foodCost: food.cost,
        foodNote: food.note,
        foodCategory: food.category,
        foodType: food.type,
        foodExpiredDate: new Date(food.exp_date),
        foodDate: new Date(food.date),
      });
      setFoodCategory(food.category);
      setFoodType(food.type);
    }
  }, [food, open, reset]);

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
  };

  const handleFoodCategoryChange = (value) => {
    setFoodCategory(value);
    setValue("foodCategory", value);
  };

  const handleFoodTypeChange = (value) => {
    setFoodType(value);
    setValue("foodType", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Edit food below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input placeholder="Input Name..." {...register("foodName")} />
              {errors.foodName && (
                <p className="text-destructive text-sm">
                  {errors.foodName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                step="1"
                min="1"
                placeholder="Input Quantity..."
                {...register("foodQuantity")}
              />
              {errors.foodQuantity && (
                <p className="text-destructive text-sm">
                  {errors.foodQuantity.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <FoodCategoryCombobox
                className="w-full"
                value={foodCategory}
                onChange={handleFoodCategoryChange}
              />
              {errors.foodCategory && (
                <p className="text-destructive text-sm">
                  {errors.foodCategory.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <FoodTypeCombobox
                className="w-full"
                value={foodType}
                onChange={handleFoodTypeChange}
              />
              {errors.foodType && (
                <p className="text-destructive text-sm">
                  {errors.foodType.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Expired Date</Label>
              <Controller
                control={control}
                name="foodExpiredDate"
                render={({ field }) => (
                  <FoodExpiredDate
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.foodExpiredDate && (
                <p className="text-destructive text-sm">
                  {errors.foodExpiredDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cost</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Cost"
                {...register("foodCost")}
              />
              {errors.foodCost && (
                <p className="text-destructive text-sm">
                  {errors.foodCost.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Controller
                control={control}
                name="foodDate"
                render={({ field }) => (
                  <FoodDate value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.foodDate && (
                <p className="text-destructive text-sm">
                  {errors.foodDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea placeholder="Note" {...register("foodNote")} />
              {errors.foodNote && (
                <p className="text-destructive text-sm">
                  {errors.foodNote.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteFoodDialog({ open, onOpenChange, food }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Delete food with ID: ", food?.id_food);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this food item?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="alert">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
