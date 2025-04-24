import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react";
  
  export function AlertDialogDelete({ open, onOpenChange }) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <div className="w-full flex flex-row items-center justify-center gap-4">
                <AlertDialogTitle>Apakah ada ingin menghapus data hewan ini?</AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter >
            <div className="w-full flex flex-row items-center justify-center gap-4">
                <AlertDialogCancel style={{ backgroundColor: "#28C823" }} className="rounded"><Check /> yes</AlertDialogCancel>
                <AlertDialogAction style={{ backgroundColor: "#FF6464" }} className="text-white rounded"><X />No</AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  