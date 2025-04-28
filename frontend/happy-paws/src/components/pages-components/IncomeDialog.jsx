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
import { Label } from "../ui/label";
import IncomeDate from "./IncomeDatepicker";
import IncomeTypeCombobox from "./IncomeCombobox";

const incomeSchema = z.object({
  incomeName: z.string().min(1, "Name is required"),
  incomeType: z.string().min(1, "Type is required"),
  incomeDate: z.date({ required_error: "Date is required" }),
  incomeAmount: z.coerce.number().min(1, "Amount must be 0 or more"),
  incomeNote: z.string().optional(),
});

export function InsertIncomeDialog({ open, onOpenChange }) {
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
      incomeDate: null,
      incomeAmount: null,
      incomeNote: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
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
                  <IncomeDate value={field.value} onChange={field.onChange} />
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

export function EditIncomeDialog({ open, onOpenChange, incomeData }) {
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
    }
  }, [incomeData, open, reset]);

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
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
                  <IncomeDate value={field.value} onChange={field.onChange} />
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

export function DeleteIncomeDialog({ open, onOpenChange, equipment }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Delete equipment with ID: ", equipment?.id_equipment);
    onOpenChange(false);
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
