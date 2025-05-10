import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const categories = [
  { value: "Makanan Basah", label: "Makanan Basah" },
  { value: "Makanan Kering", label: "Makanan Kering" },
];

const types = [
  { value: "Beli", label: "Beli" },
  { value: "Donasi", label: "Donasi" },
];

export function FoodCategoryCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="combobox"
              className="w-full justify-between text-left"
              onClick={() => setOpen(!open)}
            >
              {value || "Select Category"}
              <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 max-w-sm">
            <Command>
              <CommandList>
                <CommandGroup>
                  {categories.map((c) => (
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

export function FoodTypeCombobox({ value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="combobox"
              className="w-full justify-between text-left"
              onClick={() => setOpen(!open)}
              disabled={disabled}
            >
              {value || "Select Type"}
              <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 max-w-sm">
            <Command>
              <CommandList>
                <CommandGroup>
                  {types.map((t) => (
                    <CommandItem
                      key={t.value}
                      value={t.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {t.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === t.value ? "opacity-100" : "opacity-0"
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
