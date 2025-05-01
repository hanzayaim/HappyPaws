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

export function EmployeeNameCombobox({
  value,
  onChange,
  EmployeeData,
  className,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEmployees = EmployeeData.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectEmployee = (employee) => {
    onChange({
      id_employee: employee.id_employee,
      name: employee.name,
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left",
            className,
            !value && "text-muted-foreground"
          )}
        >
          {value ? value.name : "Select Employee..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Employee..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No Employee found.</CommandEmpty>
            <CommandGroup>
              {filteredEmployees.map((employee) => (
                <CommandItem
                  key={employee.id_employee}
                  onSelect={() => handleSelectEmployee(employee)}
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
  );
}
