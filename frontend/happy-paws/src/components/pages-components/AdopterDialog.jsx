import { Controller, useForm, useWatch } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { AdopterGenderCombobox } from "./AdopterCombobox";

const adopterSchema = z.object({
  AdopterName: z
    .string()
    .min(1, "Adopter name is required")
    .refine((val) => val.trim().length > 0, {
      message: "Adopter name cannot be empty",
    }),
  AdopterProfile_img: z.any().optional(),
  AdopterGender: z.string().min(1, "Gender is required"),
  AdopterPhoneNumber: z.string().min(1, "Phone Number is required"),
  AdopterAddress: z.string().min(1, "Address is required"),
});
export function InsertAdopterDialog({ open, onOpenChange }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(adopterSchema),
    mode: "onChange",
    defaultValues: {
      AdopterName: "",
      AdopterProfile_img: "",
      AdopterGender: "",
      AdopterPhoneNumber: "",
      AdopterAddress: "",
    },
  });
  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
  };
  const [previewUrl = null, setPreviewUrl] = useState(null);
  const watchFile = useWatch({
    control,
    name: "AdopterImg",
  });
  useEffect(() => {
    if (watchFile && watchFile[0]) {
      const file = watchFile[0];
      if (file instanceof File) {
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        // cleanup URL object
        return () => URL.revokeObjectURL(preview);
      }
    }
  }, [watchFile]);
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
          <DialogTitle>Adopter In</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Adopter Name</Label>
              <Controller
                control={control}
                name="AdopterName"
                render={({ field }) => (
                  <Input {...field} placeholder="Adopter Name" />
                )}
              />
              {errors.AdopterName && (
                <p className="text-destructive text-sm">
                  {errors.AdopterName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Phone Number</Label>
              <Input
                placeholder="Adopter Type"
                {...register("AdopterPhoneNumber")}
              />
              {errors.AdopterPhoneNumber && (
                <p className="text-destructive text-sm">
                  {errors.AdopterPhoneNumber.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input placeholder="Address" {...register("AdopterAddress")} />
              {errors.AdopterAddress && (
                <p className="text-destructive text-sm">
                  {errors.AdopterAddress.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <Controller
                control={control}
                name="AdopterGender"
                render={({ field }) => (
                  <>
                    <AdopterGenderCombobox
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.AdopterGender && (
                      <p className="text-destructive text-sm">
                        {errors.AdopterGender.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="picture"
                type="file"
                accept="image/*"
                {...register("AdopterImg")}
              />
              {errors.AdopterImg && (
                <p className="text-destructive text-sm">
                  {errors.AdopterImg.message}
                </p>
              )}
              <Label>Preview image</Label>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <div className="w-32 h-32 border rounded shadow-sm bg-white flex items-center justify-center overflow-hidden"></div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditAdopterDialog({ open, onOpenChange, AdopterData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(adopterSchema),
    mode: "onChange",
    defaultValues: {
      AdopterName: "",
      AdopterProfile_img: "",
      AdopterGender: "",
      AdopterPhoneNumber: "",
      AdopterAddress: "",
    },
  });
  useEffect(() => {
    if (AdopterData && open) {
      reset({
        AdopterName: AdopterData.name,
        AdopterProfile_img: AdopterData.profile_img,
        AdopterGender: AdopterData.gender,
        AdopterPhoneNumber: AdopterData.phone_number,
        AdopterAddress: AdopterData.address,
      });
    }
  }, [AdopterData, open, reset]);
  const onSubmit = (data) => {
    console.log("Form data: ", data);
    reset();
    onOpenChange(false);
  };
  const [previewUrl = null, setPreviewUrl] = useState(null);
  const watchFile = useWatch({
    control,
    name: "AdopterImg",
  });
  useEffect(() => {
    if (watchFile && watchFile[0]) {
      const file = watchFile[0];
      if (file instanceof File) {
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        // cleanup URL object
        return () => URL.revokeObjectURL(preview);
      }
    }
  }, [watchFile]);
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
          <DialogTitle>Edit Adopter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Adopter Name</Label>
              <Controller
                control={control}
                name="AdopterName"
                render={({ field }) => (
                  <Input {...field} placeholder="Adopter Name" />
                )}
              />
              {errors.AdopterName && (
                <p className="text-destructive text-sm">
                  {errors.AdopterName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Phone Number</Label>
              <Input
                placeholder="Adopter Type"
                {...register("AdopterPhoneNumber")}
              />
              {errors.AdopterPhoneNumber && (
                <p className="text-destructive text-sm">
                  {errors.AdopterPhoneNumber.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input placeholder="Address" {...register("AdopterAddress")} />
              {errors.AdopterAddress && (
                <p className="text-destructive text-sm">
                  {errors.AdopterAddress.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <Controller
                control={control}
                name="AdopterGender"
                render={({ field }) => (
                  <>
                    <AdopterGenderCombobox
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.AdopterGender && (
                      <p className="text-destructive text-sm">
                        {errors.AdopterGender.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="picture"
                type="file"
                accept="image/*"
                {...register("AdopterImg")}
              />
              {errors.AdopterImg && (
                <p className="text-destructive text-sm">
                  {errors.AdopterImg.message}
                </p>
              )}
              <Label>Preview image</Label>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <div className="w-32 h-32 border rounded shadow-sm bg-white flex items-center justify-center overflow-hidden"></div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteAdopterDialog({ open, onOpenChange, AdopterData }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Delete Adopter with ID: ", AdopterData.id_Adopter);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Adopter</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this Adopter data?
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
