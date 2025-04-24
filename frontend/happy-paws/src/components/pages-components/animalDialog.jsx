
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
import { AnimalDateIn } from "./AnimalDatepicker";
import { AnimalAdopterCombobox, AnimalGenderCombobox, AnimalNameCombobox } from "./AnimalCombobox";
  
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
                    <div>
                      <Input placeholder="Animal Type" {...register("animalType")} />
                      {errors.animalType && (
                        <p className="text-destructive text-sm">
                          {errors.animalType.message}
                        </p>
                      )}
                      
                    </div>
                    <div>
                      <Input type="number" step="1" min="1" max="99" placeholder="Age" {...register("animalAge")} />
                      {errors.animalAge && (
                        <p className="text-destructive text-sm">
                          {errors.animalAge.message}
                        </p>
                      )}
                    </div>
                    <div>
                    <Input placeholder="Rescue Location" {...register("animalRescueLoc")} />
                      {errors.animalRescueLoc && (
                        <p className="text-destructive text-sm">
                          {errors.animalRescueLoc.message}
                        </p>
                      )}
                    </div>
                    <div>
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
                    <div>
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
                    <div>
                      <Textarea placeholder="Note" {...register("animalNote")} />
                      {errors.animalNote && (
                        <p className="text-destructive text-sm">
                          {errors.animalNote.message}
                        </p>
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