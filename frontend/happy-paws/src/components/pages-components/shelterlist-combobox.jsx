import React, { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axios from "axios";

export default function ShelterCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [shelters, setShelters] = useState([]);

  const fetchSheltersData = async () => {
    try {
      const shelterRes = await axios.get(
        `/api/shelters/getShelterData`
      );

      const rawData = shelterRes.data;
      const shelterData = Array.isArray(rawData)
        ? rawData
        : rawData?.data || [];

      if (shelterData.error) {
        throw new Error(shelterData.error);
      }

      const formatted = shelterData.map((item) => ({
        label: item.shelter_name,
        value: item.shelter_name,
      }));

      setShelters(formatted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSheltersData();
  }, []);

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
          <CommandInput placeholder="Search Shelter..." />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No Shelter found.</CommandEmpty>
            <CommandGroup>
              {shelters.map((g) => (
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
