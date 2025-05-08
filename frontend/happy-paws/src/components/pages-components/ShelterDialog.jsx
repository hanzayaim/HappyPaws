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
import axios from "axios";

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
