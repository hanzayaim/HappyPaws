// import { useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
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
import axios from "axios";

// const shelterSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   role: z.string().min(1, "Role is required"),
//   gender: z.string().min(1, "Gender is required"),
//   shelter_name: z.string().min(1, "Shelter name is required"),
//   phone_number: z.string().min(10, "Phone number is required"),
//   address: z.string().min(1, "Address is required"),
// });

// export function EditShelterDialog({ open, onOpenChange, user, onSuccess }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(shelterSchema),
//     defaultValues: {
//       owner_name: "",
//       email: "",
//       shelter_name: "",
//       phone_number: "",
//       address: "",
//     },
//   });

//   useEffect(() => {
//     if (user && open) {
//       reset({
//         owner_name: user.owner_name,
//         email: user.email,
//         shelter_name: user.shelter_name,
//         phone_number: user.phone_number,
//         address: user.address,
//       });
//     }
//   }, [user, open, reset]);

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post("/api/shelters/updateShelterStatus", {
//         id_shelter: user.id_shelter,
//         ...data,
//       });

//       if (response.data && !response.data.error) {
//         onSuccess({ ...user, ...data });
//       }
//     } catch (error) {
//       console.error("Error updating shelter:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogTrigger asChild></DialogTrigger>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Edit Shelter</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 py-2">
//           <DialogDescription>Edit shelter below.</DialogDescription>
//           <div className="grid gap-4 py-4">
//             <div className="flex flex-col gap-2">
//               <Label>Owner Name</Label>
//               <Input placeholder="Input Name..." {...register("owner_name")} />
//               {errors.owner_name && (
//                 <p className="text-destructive text-sm">
//                   {errors.owner_name.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid gap-4 py-4">
//             <div className="flex flex-col gap-2">
//               <Label>Email</Label>
//               <Input placeholder="Input Email..." {...register("email")} />
//               {errors.email && (
//                 <p className="text-destructive text-sm">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid gap-4 py-4">
//             <div className="flex flex-col gap-2">
//               <Label>Shelter Name</Label>
//               <Input
//                 placeholder="Input Shelter Name..."
//                 {...register("shelter_name")}
//               />
//               {errors.shelter_name && (
//                 <p className="text-destructive text-sm">
//                   {errors.shelter_name.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid gap-4 py-4">
//             <div className="flex flex-col gap-2">
//               <Label>Phone Number</Label>
//               <Input
//                 placeholder="Input Phone Number..."
//                 {...register("phone_number")}
//               />
//               {errors.phone_number && (
//                 <p className="text-destructive text-sm">
//                   {errors.phone_number.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="grid gap-4 py-4">
//             <div className="flex flex-col gap-2">
//               <Label>Address</Label>
//               <Textarea
//                 placeholder="Input Address..."
//                 {...register("address")}
//               />
//               {errors.address && (
//                 <p className="text-destructive text-sm">
//                   {errors.address.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button type="button" variant="cancel">
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button type="submit">Submit</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

export function DeleteShelterDialog({ open, onOpenChange, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error deleting shelter:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Shelter</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this shelter?
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

export function ApproveShelterDialog({ open, onOpenChange, user, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shelters/updateShelterStatus", {
        id_shelter: user.id_shelter,
        status: "Active",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error approving shelter:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Approve Shelter</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to approve this shelter?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="success">
              Approve
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function RejectShelterDialog({ open, onOpenChange, user, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shelters/updateShelterStatus", {
        id_shelter: user.id_shelter,
        status: "Inactive",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error rejecting shelter:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reject Shelter</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to reject this shelter?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="alert">
              Reject
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ActivateShelterDialog({ open, onOpenChange, user, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shelters/updateShelterStatus", {
        id_shelter: user.id_shelter,
        status: "Active",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error activating shelter:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Activate Shelter</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to activate this shelter?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="success">
              Activate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeactivateShelterDialog({
  open,
  onOpenChange,
  user,
  onConfirm,
}) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shelters/updateShelterStatus", {
        id_shelter: user.id_shelter,
        status: "Inactive",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error deactivating shelter:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Deactivate Shelter</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to deactivate this shelter?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="alert">
              Deactivate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
