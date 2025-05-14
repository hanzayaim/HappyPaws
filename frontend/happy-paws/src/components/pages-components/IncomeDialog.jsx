import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
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
import { Label } from "../ui/label";
import IncomeTypeCombobox from "./IncomeCombobox";
import DatePicker from "./DatePicker";

const incomeSchema = z.object({
  incomeName: z.string().min(1, "Name is required"),
  incomeType: z.string().min(1, "Type is required"),
  incomeDate: z.date({ required_error: "Date is required" }),
  incomeAmount: z.coerce.number().min(1, "Amount must be 0 or more"),
  incomeNote: z.string().optional(),
});

export function InsertIncomeDialog({ open, onOpenChange, User, fetchData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      incomeName: "",
      incomeType: "",
      incomeDate: "",
      incomeAmount: null,
      incomeNote: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/income/insertIncomeData", {
        id_shelter: User.id_shelter,
        name: data.incomeName,
        amount: data.incomeAmount,
        date: data.incomeDate.toLocaleDateString("en-CA"),
        type: data.incomeType,
        note: data.incomeNote || "",
        created_by: User.owner_name ? User.owner_name : User.name,
      });
      const result = response.data;
      if (result.error) {
        throw new Error(result.message || "Failed to insert income data");
      }

      reset();
      onOpenChange(false);
      fetchData();
    } catch (error) {
      console.log(error);
      console.error("Error inserting income:", error.message);
    }
  };
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Insert new income below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input placeholder="Input Name..." {...register("incomeName")} />
              {errors.incomeName && (
                <p className="text-destructive text-sm">
                  {errors.incomeName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Controller
                control={control}
                name="incomeType"
                render={({ field }) => (
                  <>
                    <IncomeTypeCombobox
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.incomeType && (
                      <p className="text-destructive text-sm">
                        {errors.incomeType.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Controller
                control={control}
                name="incomeDate"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.incomeDate && (
                <p className="text-destructive text-sm">
                  {errors.incomeDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Input Amount..."
                {...register("incomeAmount")}
              />
              {errors.incomeAmount && (
                <p className="text-destructive text-sm">
                  {errors.incomeAmount.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Input Note..."
                {...register("incomeNote")}
              />
              {errors.incomeNote && (
                <p className="text-destructive text-sm">
                  {errors.incomeNote.message}
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

export function EditIncomeDialog({
  open,
  onOpenChange,
  incomeData,
  User,
  fetchData,
}) {
  const [incomeType, setIncomeType] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      incomeName: "",
      incomeType: "",
      incomeDate: null,
      incomeAmount: null,
      incomeNote: "",
    },
  });

  useEffect(() => {
    if (incomeData && open) {
      reset({
        incomeName: incomeData.name,
        incomeType: incomeData.type,
        incomeDate: new Date(incomeData.date),
        incomeAmount: incomeData.amount,
        incomeNote: incomeData.note,
      });
      setIncomeType(incomeData.type);
      setValue("incomeType", incomeData.type);
    }
  }, [incomeData, open, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/income/updateIncomeData", {
        id_income: incomeData.id_income,
        id_shelter: User.id_shelter,
        name: data.incomeName,
        amount: data.incomeAmount,
        date: data.incomeDate.toLocaleDateString("en-CA"),
        type: data.incomeType,
        note: data.incomeNote,
        update_by: User.owner_name ? User.owner_name : User.name,
      });

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to update income data");
      }

      reset();
      fetchData();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating income:", error.message);
    }
  };

  const handleIncomeTypeChange = (value) => {
    setIncomeType(value);
    setValue("incomeType", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Edit Income below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input placeholder="Input Name..." {...register("incomeName")} />
              {errors.incomeName && (
                <p className="text-destructive text-sm">
                  {errors.incomeName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <IncomeTypeCombobox
                className="w-full"
                value={incomeType}
                onChange={handleIncomeTypeChange}
              />
              {errors.incomeType && (
                <p className="text-destructive text-sm">
                  {errors.incomeType.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Input Cost..."
                {...register("incomeAmount")}
              />
              {errors.incomeAmount && (
                <p className="text-destructive text-sm">
                  {errors.incomeAmount.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Controller
                control={control}
                name="incomeDate"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.incomeDate && (
                <p className="text-destructive text-sm">
                  {errors.incomeDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Input Note..."
                {...register("incomeNote")}
              />
              {errors.incomeNote && (
                <p className="text-destructive text-sm">
                  {errors.incomeNote.message}
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

export function DeleteIncomeDialog({ open, onOpenChange, income, fetchData }) {
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/income/deleteIncomeData", {
        id_shelter: income.id_shelter,
        id_income: income.id_income,
      });

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to delete income data");
      }

      data.preventDefault();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting Income:", error.message);
    }

    fetchData();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this Income item?
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
