import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SuccessInsertDialog({ open, onOpenChange, data_name }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-xl">
            🎉 Insert Success!
          </DialogTitle>
          <DialogDescription>
            {data_name} has been inserted successfully.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SuccessUpdateDialog({ open, onOpenChange, data_name }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-xl">
            🎉 Update Success!
          </DialogTitle>
          <DialogDescription>
            {data_name} has been update successfully.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SuccessDeleteDialog({ open, onOpenChange, data_name }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-xl">
            🎉 Delete Success!
          </DialogTitle>
          <DialogDescription>
            {data_name} has been delete successfully.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SuccessAdoptAnimalDialog({
  open,
  onOpenChange,
  data_animal,
  data_adopter,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-xl">
            🎉 Adopt Success!
          </DialogTitle>
          <DialogDescription>
            {data_animal} has been adopt by {data_adopter}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
