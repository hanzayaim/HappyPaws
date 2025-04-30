import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function EmployeeNameCombobox({ value, onChange, EmployeeData }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between text-left",
                !value && "text-muted-foreground"
              )}
            >
              {value ? value.name : "Select Employee..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search Employee..." className="h-9" />
              <CommandList>
                <CommandEmpty>No Employee found.</CommandEmpty>
                <CommandGroup>
                  {EmployeeData.map((employee) => (
                    <CommandItem
                      key={employee.id_employee}
                      onSelect={() => {
                        onChange(employee);
                        setOpen(false);
                      }}
                    >
                      {employee.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value?.id_employee === employee.id_employee
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
