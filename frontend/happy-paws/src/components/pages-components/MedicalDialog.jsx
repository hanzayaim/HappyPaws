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
import DatePicker from "./DatePicker";
import {
  MedicalStatusCombobox,
  VaccineStatusCombobox,
} from "./MedicalCombobox";
import { AnimalNameCombobox } from "./AnimalCombobox";

const medicalSchema = z.object({
  animalName: z.string().min(1, "Animal is required"),
  medicalStatus: z.string().min(1, "Medical Status is required"),
  vaccineStatus: z.string().min(1, "Vaccine Status is required"),
  medicalDate: z
    .date({ required_error: "Medical Date In is required" })
    .nullable()
    .refine((data) => data !== null, {
      message: "Medical Date In is required",
    }),
  medicalCost: z.coerce
    .number()
    .min(0, "Cost must be 0 or more")
    .or(z.literal("").transform(() => 0)),
  medicalNote: z.string().optional(),
});

export function InsertMedicalDialog({ open, onOpenChange }) {
  const [medicalStatus, setMedicalStatus] = useState("");
  const [vaccineStatus, setVaccineStatus] = useState("");
  const [animalName, setAnimalName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(medicalSchema),
    defaultValues: {
      animalName: "",
      medicalStatus: "",
      vaccineStatus: "",
      medicalDate: null,
      medicalCost: null,
      medicalNote: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
  };

  const handleMedicalStatusChange = (value) => {
    setMedicalStatus(value);
    setValue("medicalStatus", value);
  };

  const handleVaccineStatusChange = (value) => {
    setVaccineStatus(value);
    setValue("vaccineStatus", value);
  };

  const handleAnimalNameChange = (value) => {
    setAnimalName(value);
    setValue("animalName", value);
  };

  useEffect(() => {
    if (!open) {
      reset();
      setMedicalStatus("");
      setVaccineStatus("");
      setAnimalName("");
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Insert new medical below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Select Animal</Label>
              <AnimalNameCombobox
                className="w-full"
                value={animalName}
                onChange={handleAnimalNameChange}
              />
              {errors.animalName && (
                <p className="text-destructive text-sm">
                  {errors.animalName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Medical Status</Label>
              <MedicalStatusCombobox
                className="w-full"
                value={medicalStatus}
                onChange={handleMedicalStatusChange}
              />
              {errors.medicalStatus && (
                <p className="text-destructive text-sm">
                  {errors.medicalStatus.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Vaccine Status</Label>
              <VaccineStatusCombobox
                className="w-full"
                value={vaccineStatus}
                onChange={handleVaccineStatusChange}
              />
              {errors.vaccineStatus && (
                <p className="text-destructive text-sm">
                  {errors.vaccineStatus.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Medical Date In</Label>
              <Controller
                control={control}
                name="medicalDate"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.medicalDate && (
                <p className="text-destructive text-sm">
                  {errors.medicalDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Medical Date Out</Label>
              <Controller
                control={control}
                name="medicalDateOut"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Medical Cost</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Input Cost..."
                {...register("medicalCost")}
              />
              {errors.medicalCost && (
                <p className="text-destructive text-sm">
                  {errors.medicalCost.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Input Note..."
                {...register("medicalNote")}
              />
              {errors.medicalNote && (
                <p className="text-destructive text-sm">
                  {errors.medicalNote.message}
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

export function EditMedicalDialog({ open, onOpenChange, medical }) {
  const [medicalStatus, setMedicalStatus] = useState("");
  const [vaccineStatus, setVaccinStatus] = useState("");
  const [animalName, setAnimalName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(medicalSchema),
    defaultValues: {
      animalName: "",
      medicalStatus: "",
      vaccineStatus: "",
      medicalDate: null,
      medicalDateOut: null,
      medicalCost: null,
      medicalNote: "",
    },
  });

  useEffect(() => {
    if (medical && open) {
      reset({
        animalName: medical.id_animal,
        medicalStatus: medical.medical_status,
        vaccineStatus: medical.vaccin_status,
        medicalDate: new Date(medical.medical_date_in),
        medicalDateOut: medical.medical_date_out
          ? new Date(medical.medical_date_out)
          : null,
        medicalCost: medical.medical_cost,
        medicalNote: medical.note,
      });
      setAnimalName(medical.id_animal);
      setMedicalStatus(medical.medical_status);
      setVaccinStatus(medical.vaccin_status);
    }
  }, [medical, open, reset]);

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
  };

  const handleMedicalStatusChange = (value) => {
    setMedicalStatus(value);
    setValue("medicalStatus", value);
  };

  const handleVaccinStatusChange = (value) => {
    setVaccinStatus(value);
    setValue("vaccineStatus", value);
  };

  const handleAnimalNameChange = (value) => {
    setAnimalName(value);
    setValue("animalName", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medical</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <DialogDescription>Edit data medical below.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Select Animal</Label>
              <AnimalNameCombobox
                className="w-full"
                value={animalName}
                onChange={handleAnimalNameChange}
              />
              {errors.animalName && (
                <p className="text-destructive text-sm">
                  {errors.animalName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Medical Status</Label>
              <MedicalStatusCombobox
                className="w-full"
                value={medicalStatus}
                onChange={handleMedicalStatusChange}
              />
              {errors.medicalStatus && (
                <p className="text-destructive text-sm">
                  {errors.medicalStatus.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Vaccine Status</Label>
              <VaccineStatusCombobox
                className="w-full"
                value={vaccineStatus}
                onChange={handleVaccinStatusChange}
              />
              {errors.vaccineStatus && (
                <p className="text-destructive text-sm">
                  {errors.vaccineStatus.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Medical Date In</Label>
              <Controller
                control={control}
                name="medicalDate"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.medicalDate && (
                <p className="text-destructive text-sm">
                  {errors.medicalDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Medical Date Out</Label>
              <Controller
                control={control}
                name="medicalDateOut"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Medical Cost</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Input Cost..."
                {...register("medicalCost")}
              />
              {errors.medicalCost && (
                <p className="text-destructive text-sm">
                  {errors.medicalCost.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Input Note..."
                {...register("medicalNote")}
              />
              {errors.medicalNote && (
                <p className="text-destructive text-sm">
                  {errors.medicalNote.message}
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
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteMedicalDialog({ open, onOpenChange, medical }) {
  const onSubmit = (e) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Medical</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this medical record?
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
