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

export function DeleteEmployeeDialog({ open, onOpenChange, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to delete this employee?
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

export function ApproveEmployeeDialog({ open, onOpenChange, user, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/employees/updateEmployeeStatus", {
        id_shelter: user.id_shelter,
        id_employee: user.id_employee,
        status: "Active",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error approving employee:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Approve Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to approve this employee?
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

export function RejectEmployeeDialog({ open, onOpenChange, user, onConfirm }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/employees/updateEmployeeStatus", {
        id_shelter: user.id_shelter,
        id_employee: user.id_employee,
        status: "Inactive",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error rejecting employee:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reject Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to reject this employee?
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

export function ActivateEmployeeDialog({
  open,
  onOpenChange,
  user,
  onConfirm,
}) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/employees/updateEmployeeStatus", {
        id_shelter: user.id_shelter,
        id_employee: user.id_employee,
        status: "Active",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error activating employee:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Activate Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to activate this employee?
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

export function DeactivateEmployeeDialog({
  open,
  onOpenChange,
  user,
  onConfirm,
}) {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/employees/updateEmployeeStatus", {
        id_shelter: user.id_shelter,
        id_employee: user.id_employee,
        status: "Inactive",
        email: user.email,
      });

      if (response.data && !response.data.error) {
        onConfirm();
      }
    } catch (error) {
      console.error("Error deactivating employee:", error);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Deactivate Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-2 py-2">
          <DialogDescription>
            Are you sure want to deactivate this employee?
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
