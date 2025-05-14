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
import { EmployeeNameCombobox } from "./SalaryCombobox";
import DatePicker from "./DatePicker";
import { SuccessInsertDialog } from "./SuccessDialog";

const SalarySchema = z.object({
  SalaryName: z
    .object({
      id_employee: z.string(),
      name: z.string(),
    })
    .nullable(),

  SalaryAmount: z.coerce.number().min(0, "Amount must be 0 or more"), // Adjusted validation
  SalaryDate: z.date({ required_error: "Date is required" }),
  SalaryNote: z.string().optional(),
});

export function InsertSalaryDialog({
  open,
  onOpenChange,
  User,
  EmployeeData,
  fetchDataSalary,
}) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [insertSalaryName, setInsertSalaryName] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SalarySchema),
    defaultValues: {
      SalaryName: null,
      SalaryAmount: "",
      SalaryDate: new Date(),
      SalaryNote: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.SalaryName) {
      console.log("Employee is required");
      return;
    }

    try {
      const response = await axios.post("/api/salary/insertSalaryData", {
        id_shelter: User.id_shelter,
        id_employee: data.SalaryName.id_employee,
        name: `Salary Month - ${data.SalaryName.name}`,
        cost: data.SalaryAmount,
        date: data.SalaryDate.toLocaleDateString("en-CA"),
        note: data.SalaryNote || "",
        created_by: User.owner_name ? User.owner_name : User.name,
      });

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to insert Salary data");
      }

      reset();
      onOpenChange(false);
      setInsertSalaryName(data.SalaryName.name);
      setShowSuccessDialog(true);
      fetchDataSalary();
    } catch (error) {
      console.error("Error inserting Salary:", error.message);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);
  return (
    <>
      <SuccessInsertDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        data_name={"Salary " + insertSalaryName}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Employee Salary</DialogTitle>
          </DialogHeader>
          <DialogDescription>Insert new salary below.</DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Controller
                  control={control}
                  name="SalaryName"
                  render={({ field }) => {
                    const handleChange = (value) => {
                      field.onChange(value);
                    };
                    return (
                      <>
                        <EmployeeNameCombobox
                          EmployeeData={EmployeeData}
                          className="w-full"
                          value={field.value}
                          onChange={handleChange}
                        />
                        {errors.SalaryName && (
                          <p className="text-destructive text-sm">
                            {errors.SalaryName.message}
                          </p>
                        )}
                      </>
                    );
                  }}
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
    </>
  );
}

export function DeleteSalaryDialog({
  open,
  onOpenChange,
  SalaryData,
  fetchData,
}) {
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/salary/deleteSalaryData", {
        id_shelter: SalaryData.id_shelter,
        id_salary: SalaryData.id_salary,
      });

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to delete Salary data");
      }
      console.log("Delete Salary with ID: ", SalaryData?.id_salary);
      onOpenChange(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting Salary:", error.message);
    }
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
