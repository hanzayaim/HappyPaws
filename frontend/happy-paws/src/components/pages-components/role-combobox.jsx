import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const roles = [
  { value: "Finance", label: "Finance" },
  { value: "Medical", label: "Medical" },
  { value: "Administrator", label: "Administrator" },
];

export default function RolesCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combobox"
          className="justify-between text-left"
          onClick={() => setOpen(!open)}
        >
          {value || "Select Role"}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {roles.map((g) => (
                <CommandItem
                  key={g.value}
                  value={g.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {g.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === g.value ? "opacity-100" : "opacity-0"
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
