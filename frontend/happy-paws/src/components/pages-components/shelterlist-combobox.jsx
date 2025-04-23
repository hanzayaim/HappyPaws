import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const shelter = [{ value: "test", label: "test" }];

export default function ShelterCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combobox"
          className="justify-between text-left"
          onClick={() => setOpen(!open)}
        >
          {value || "Select Shelter"}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {shelter.map((g) => (
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
