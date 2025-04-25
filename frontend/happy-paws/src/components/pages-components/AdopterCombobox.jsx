import React, { useState } from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const gender = [
  { value: "Laki-laki", label: "Laki-Laki" },
  { value: "Perempuan", label: "Perempuan" },
];



export function AdopterGenderCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="combobox"
              className={cn(
                "w-full justify-between text-left",
                !value && "text-muted-foreground"
              )}
              onClick={() => setOpen(!open)}
            >
              {value || "Select Gender"}
              <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 max-w-sm">
            <Command>
              <CommandList>
                <CommandGroup>
                  {gender.map((c) => (
                    <CommandItem
                      key={c.value}
                      value={c.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {c.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === c.value ? "opacity-100" : "opacity-0"
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