
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
import { AnimalDateIn } from "./AnimalDatepicker";
import { AnimalAdopterCombobox, AnimalGenderCombobox, AnimalNameCombobox } from "./AnimalCombobox";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
  
const animalInSchema = z.object({
    animalName: z.string().min(1, "Animal name is required").refine(val => val.trim().length > 0, {
        message: "Animal name cannot be empty",
      }),
    animalType: z.string().optional(),
    animalAge: z.coerce.number().optional(),
    animalRescueLoc: z.string().optional(),
    animalDate: z.date({ required_error: "Date is required" }),
    animalGender: z.string().min(1, "Animal gender is required"),
    animalNote: z.string().optional(),
    animalImg: z.any().optional(),
  });
export  function AnimalInDialog({ open, onOpenChange }){
      const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(animalInSchema),
        mode: "onChange", 
        defaultValues: {
            animalName: "",
            animalType: "",
            animalAge: "",
            animalRescueLoc: "",
            animalDate: null,
            animalGender: "",
            animalImg: null
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
        name: "animalImg",
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
      return(
        <Dialog open={open} onOpenChange={onOpenChange}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Animal In</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label>Animal Name</Label>
                      <Controller
                      control={control}
                      name="animalName"
                      render={({ field }) => (
                          <Input 
                          {...field} 
                          placeholder="Animal Name"
                          />
                      )}
                      />
                        {errors.animalName && (
                          <p className="text-destructive text-sm">
                            {errors.animalName.message}
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Type</Label>
                      <Input placeholder="Animal Type" {...register("animalType")} />
                      {errors.animalType && (
                        <p className="text-destructive text-sm">
                          {errors.animalType.message}
                        </p>
                      )}
                      
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Age</Label>
                      <Input type="number" step="1" min="1" max="99" placeholder="Age" {...register("animalAge")} />
                      {errors.animalAge && (
                        <p className="text-destructive text-sm">
                          {errors.animalAge.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Rescue Location</Label>
                    <Input placeholder="Rescue Location" {...register("animalRescueLoc")} />
                      {errors.animalRescueLoc && (
                        <p className="text-destructive text-sm">
                          {errors.animalRescueLoc.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Date</Label>
                      <Controller
                        control={control}
                        name="animalDate"
                        render={({ field }) => (
                          <AnimalDateIn
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.animalDate && (
                        <p className="text-destructive text-sm">
                          {errors.animalDate.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Gender</Label>
                    <Controller
                    control={control}
                    name="animalGender"
                    render={({ field }) => (
                        <>
                        <AnimalGenderCombobox
                            className="w-full"
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {errors.animalGender && (
                            <p className="text-destructive text-sm">
                            {errors.animalGender.message}
                            </p>
                        )}
                        </>
                    )}
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Note</Label>
                      <Textarea placeholder="Note" {...register("animalNote")} />
                      {errors.animalNote && (
                        <p className="text-destructive text-sm">
                          {errors.animalNote.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input  id="picture" type="file" accept="image/*" {...register("animalImg")} />
                      {errors.animalImg && (
                        <p className="text-destructive text-sm">
                          {errors.animalImg.message}
                        </p>
                      )}
                      <Label>Preview image</Label>
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-32 h-32 border rounded shadow-sm bg-white flex items-center justify-center overflow-hidden">
                          
                        </div>
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

  const animalOutSchema = z.object({
    animalName: z.string().min(1, "Animal Name is required"),
    animalAdopter: z.string().min(1, "Animal Adopter is required"),
  });
export  function AnimalOutDialog({ open, onOpenChange }){
      const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(animalOutSchema),
        mode: "onChange", 
        defaultValues: {
            animalName: "",
            animalAdopter: "",
        },
      });
      const onSubmit = (data) => {
        console.log("Form data: ", data);
        reset();
        onOpenChange(false);
      };
    
      return(
        <Dialog open={open} onOpenChange={onOpenChange}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Animal In</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
                  <div className="grid gap-4 py-4">
                    <div>
                      <Controller
                      control={control}
                      name="animalName"
                      render={({ field }) => (
                          <>
                          <AnimalNameCombobox
                              className="w-full"
                              value={field.value}
                              onChange={field.onChange}
                          />
                          {errors.animalName && (
                              <p className="text-destructive text-sm">
                              {errors.animalName.message}
                              </p>
                          )}
                          </>
                      )}
                      />
                    </div>
                    <div>
                      <Controller
                      control={control}
                      name="animalAdopter"
                      render={({ field }) => (
                          <>
                          <AnimalAdopterCombobox
                              className="w-full"
                              value={field.value}
                              onChange={field.onChange}
                          />
                          {errors.animalAdopter && (
                              <p className="text-destructive text-sm">
                              {errors.animalAdopter.message}
                              </p>
                          )}
                          </>
                      )}
                      />
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

const animalEditSchema = z.object({
    animalName: z.string().min(1, "Animal name is required").refine(val => val.trim().length > 0, {
        message: "Animal name cannot be empty",
      }),
    animalType: z.string().optional(),
    animalAge: z.coerce.number().optional(),
    animalRescueLoc: z.string().optional(),
    animalDate: z.date({ required_error: "Date is required" }),
    animalGender: z.string().min(1, "Animal gender is required"),
    animalNote: z.string().optional(),
    animalImg: z.any().optional()
  });
export function AnimalEditDialog({ open, onOpenChange,animalData }){
      const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(animalEditSchema),
        mode: "onChange", 
        defaultValues: {
            animalName: "",
            animalType: "",
            animalAge: "",
            animalRescueLoc: "",
            animalDate: null,
            animalGender: "",
            animalImg: null
        },
      });
      useEffect(() => {
        if (animalData && open) {
          reset({
            animalName: animalData.animal_name,
            animalType: animalData.animal_type,
            animalAge: animalData.animal_age,
            animalRescueLoc: animalData.rescue_location,
            animalDate: new Date(animalData.date),
            animalGender: animalData.animal_gender,
            animalNote: animalData.note,
            animalImg: animalData.animal_img
          });
        }
      }, [animalData, open, reset]);
      const onSubmit = (data) => {
        console.log("Form data: ", data);
        reset();
        onOpenChange(false);
      };
      const [previewUrl = null, setPreviewUrl] = useState(null);
      const watchFile = useWatch({
        control,
        name: "animalImg",
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
      return(
        <Dialog open={open} onOpenChange={onOpenChange}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle >Edit Animal</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
                  <DialogDescription>Edit animal below.</DialogDescription>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                    <Label>Animal Name</Label>
                    <Controller
                    control={control}
                    name="animalName"
                    render={({ field }) => (
                        <Input 
                        {...field} 
                        placeholder="Animal Name"
                        />
                    )}
                    />
                      {errors.animalName && (
                        <p className="text-destructive text-sm">
                          {errors.animalName.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Type</Label>
                      <Input placeholder="Animal Type" {...register("animalType")} />
                      {errors.animalType && (
                        <p className="text-destructive text-sm">
                          {errors.animalType.message}
                        </p>
                      )}
                      
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Age</Label>
                      <Input type="number" step="1" min="1" max="99" placeholder="Age" {...register("animalAge")} />
                      {errors.animalAge && (
                        <p className="text-destructive text-sm">
                          {errors.animalAge.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Rescue Location</Label>
                    <Input placeholder="Rescue Location" {...register("animalRescueLoc")} />
                      {errors.animalRescueLoc && (
                        <p className="text-destructive text-sm">
                          {errors.animalRescueLoc.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Date In</Label>
                      <Controller
                        control={control}
                        name="animalDate"
                        render={({ field }) => (
                          <AnimalDateIn
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.animalDate && (
                        <p className="text-destructive text-sm">
                          {errors.animalDate.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Gender</Label>
                    <Controller
                    control={control}
                    name="animalGender"
                    render={({ field }) => (
                        <>
                        <AnimalGenderCombobox
                            className="w-full"
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {errors.animalGender && (
                            <p className="text-destructive text-sm">
                            {errors.animalGender.message}
                            </p>
                        )}
                        </>
                    )}
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Note</Label>
                      <Textarea placeholder="Note" {...register("animalNote")} />
                      {errors.animalNote && (
                        <p className="text-destructive text-sm">
                          {errors.animalNote.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <Label>Choose image</Label>
                    <Input id="picture" type="file" accept="image/*" {...register("animalImg")} />
                      {errors.animalImg && (
                        <p className="text-destructive text-sm">
                          {errors.animalImg.message}
                        </p>
                      )}
                      <Label>Preview image</Label>
                      <div className="w-32 h-32 border rounded shadow-sm bg-white flex items-center justify-center overflow-hidden">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Edit</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
      );



  }