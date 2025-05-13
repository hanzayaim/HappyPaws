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
import EquipmentTypeCombobox from "./EquipmentCombobox";
import { Label } from "../ui/label";
import DatePicker from "./DatePicker";
import axios from "axios";
import { SuccessInsertDialog, SuccessUpdateDialog } from "./SuccessDialog";

const equipmentSchema = z.object({
  equipmentName: z.string().min(1, "Name is required"),
  equipmentType: z.string().min(1, "Type is required"),
  equipmentDate: z
    .date({ required_error: "Expired date is required" })
    .nullable()
    .refine((data) => data !== null, {
      message: "Expired date is required",
    }),
  equipmentCost: z.coerce
    .number({ required_error: "Cost is required" })
    .min(0, "Cost must be 0 or more")
    .refine((val) => val !== null && val !== undefined, {
      message: "Cost is required",
    }),
  equipmentNote: z.string().optional(),
});

export function InsertEquipmentDialog({ open, onOpenChange, User, fetchData }) {
  const [equipmentType, setEquipmentType] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [insertEquipmentName, setInsertEquipmentName] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipmentName: "",
      equipmentType: "",
      equipmentDate: null,
      equipmentCost: "",
      equipmentNote: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/api/equipment/insertEquipmentData",
        {
          name: data.equipmentName,
          type: data.equipmentType,
          date: data.equipmentDate.toLocaleDateString("en-CA"),
          cost: data.equipmentCost,
          note: data.equipmentNote,
          created_by: User.owner_name ? User.owner_name : User.name,
          id_shelter: User.id_shelter,
        }
      );
      const result = response.data;
      if (result.error) {
        throw new Error(result.message || "Failed to insert Equipment data");
      }

      reset();
      fetchData();

      setInsertEquipmentName(data.equipmentName);
      setShowSuccessDialog(true);
      onOpenChange(false);
    } catch (error) {
      console.error("Error insert Equipment:", error.message);
    }
  };

  const handleEquipmentTypeChange = (value) => {
    setEquipmentType(value);
    setValue("equipmentType", value);
  };

  useEffect(() => {
    if (!open) {
      reset();
      setEquipmentType("");
    }
  }, [open, reset]);

  return (
    <>
      <SuccessInsertDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        data_name={insertEquipmentName}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Equipment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
            <DialogDescription>Insert new equipment below.</DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  placeholder="Input Name..."
                  {...register("equipmentName")}
                />
                {errors.equipmentName && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Type</Label>
                <EquipmentTypeCombobox
                  className="w-full"
                  value={equipmentType}
                  onChange={handleEquipmentTypeChange}
                />
                {errors.equipmentType && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentType.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Date</Label>
                <Controller
                  control={control}
                  name="equipmentDate"
                  render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.equipmentDate && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Total Cost</Label>
                <Input
                  disabled={equipmentType === "Donasi"}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Input Cost..."
                  {...register("equipmentCost", { required: true })}
                />
                {errors.equipmentCost && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentCost.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Note</Label>
                <Textarea
                  placeholder="Input Note..."
                  {...register("equipmentNote")}
                />
                {errors.equipmentNote && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentNote.message}
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

export function EditEquipmentDialog({
  open,
  onOpenChange,
  equipment,
  User,
  fetchData,
}) {
  const [equipmentType, setEquipmentType] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [editedEquipmentName, setEditedEquipmentName] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipmentName: "",
      equipmentType: "",
      equipmentDate: null,
      equipmentCost: "",
      equipmentNote: "",
    },
  });

  useEffect(() => {
    if (equipment && open) {
      reset({
        equipmentName: equipment.name,
        equipmentType: equipment.type,
        equipmentDate: new Date(equipment.date),
        equipmentCost: equipment.cost,
        equipmentNote: equipment.note,
      });
      setEquipmentType(equipment.type);
    }
  }, [equipment, open, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/api/equipment/updateEquipmentData",
        {
          name: data.equipmentName,
          type: data.equipmentType,
          date: data.equipmentDate.toLocaleDateString("en-CA"),
          cost: data.equipmentType === "Donasi" ? 0 : data.equipmentCost,
          note: data.equipmentNote,
          updated_by: User.owner_name ? User.owner_name : User.name,
          id_shelter: User.id_shelter,
          id_equipment: equipment.id_equipment,
        }
      );

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to update Equipment data");
      }

      reset();
      fetchData();
      setEditedEquipmentName(data.equipmentName);
      setShowSuccessDialog(true);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating Equipment:", error.message);
    }
  };

  const handleEquipmentTypeChange = (value) => {
    setEquipmentType(value);
    setValue("equipmentType", value);
  };

  return (
    <>
      <SuccessUpdateDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        data_name={editedEquipmentName}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Equipment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
            <DialogDescription>Edit equipment below.</DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  placeholder="Input Name..."
                  {...register("equipmentName")}
                />
                {errors.equipmentName && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Type</Label>
                <EquipmentTypeCombobox
                  className="w-full"
                  value={equipmentType}
                  onChange={handleEquipmentTypeChange}
                  disabled={true}
                />
                {errors.equipmentType && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentType.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Total Cost</Label>
                <Input
                  disabled={equipmentType === "Donasi"}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Input Cost..."
                  {...register("equipmentCost", { required: true })}
                />
                {errors.equipmentCost && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentCost.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Date</Label>
                <Controller
                  control={control}
                  name="equipmentDate"
                  render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.equipmentDate && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Note</Label>
                <Textarea
                  placeholder="Input Note..."
                  {...register("equipmentNote")}
                />
                {errors.equipmentNote && (
                  <p className="text-destructive text-sm">
                    {errors.equipmentNote.message}
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
    </>
  );
}

export function DeleteEquipmentDialog({
  open,
  onOpenChange,
  equipment,
  fetchData,
}) {
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/api/equipment/deleteEquipmentData/",
        {
          id_shelter: equipment.id_shelter,
          id_equipment: equipment.id_equipment,
        }
      );

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to delete equipment data");
      }

      data.preventDefault();
      console.log("Delete equipment with ID: ", equipment?.id_equipment);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting equipment:", error.message);
    }

    fetchData();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Equipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this equipment item?
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
