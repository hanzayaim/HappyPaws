import { useEffect } from "react";
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
import { EmployeeNameCombobox } from "./SalaryCombobox";
import DatePicker from "./DatePicker";

const SalarySchema = z.object({
  SalaryName: z.string().min(1, "Name is required"),
  SalaryAmount: z.coerce.number().min(1, "Amount must be 0 or more"),
  SalaryDate: z.date({ required_error: "Date is required" }),
  SalaryNote: z.string().optional(),
});

export function InsertSalaryDialog({ open, onOpenChange, EmployeeData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SalarySchema),
    defaultValues: {
      SalaryName: "",
      SalaryAmount: "",
      SalaryDate: null,
      SalaryNote: "",
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
          <DialogTitle>Add Employee Salary</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Insert new salary below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Controller
                control={control}
                name="SalaryName"
                render={({ field }) => (
                  <>
                    <EmployeeNameCombobox
                      EmployeeData={EmployeeData}
                      className="w-full"
                      value={field.value}
                      onChange={(selectedEmployee) => {
                        field.onChange(
                          `Salary Month - ${selectedEmployee.name}`
                        );
                      }}
                    />
                    {errors.SalaryName && (
                      <p className="text-destructive text-sm">
                        {errors.SalaryName.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Amount</Label>
              <Controller
                control={control}
                name="SalaryAmount"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Input Amount..."
                  />
                )}
              />
              {errors.SalaryAmount && (
                <p className="text-destructive text-sm">
                  {errors.SalaryAmount.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Controller
                control={control}
                name="SalaryDate"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.SalaryDate && (
                <p className="text-destructive text-sm">
                  {errors.SalaryDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Input Note..."
                {...register("SalaryNote")}
              />
              {errors.SalaryNote && (
                <p className="text-destructive text-sm">
                  {errors.SalaryNote.message}
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

export function DeleteSalaryDialog({ open, onOpenChange, SalaryData }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Delete equipment with ID: ", SalaryData?.id_salary);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Employee Salary</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this Employee Salary item?
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
