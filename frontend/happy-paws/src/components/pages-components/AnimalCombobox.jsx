import React, { useEffect, useState } from "react";
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

export function AnimalOutCombobox({ value, onChange, animal }) {
  const [open, setOpen] = useState(false);
  const animalData = animal;
  const selectedAnimal = animalData.find((a) => a.id_animal === value);

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
              {selectedAnimal ? selectedAnimal.animal_name : "Select Animal..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search animal..." className="h-9" />
              <CommandList>
                <CommandEmpty>No animal found.</CommandEmpty>
                <CommandGroup>
                  {animalData
                    .filter((animal) => animal.animal_status == "Available")
                    .map((animal) => (
                      <CommandItem
                        key={animal.id_animal}
                        onSelect={() => {
                          onChange(
                            animal.id_animal === value ? "" : animal.id_animal
                          );
                          setOpen(false);
                        }}
                      >
                        {animal.animal_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === animal.id_animal
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

export function AnimalNameCombobox({ value, onChange, animal, disabled }) {
  const [open, setOpen] = useState(false);
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const availableAnimals = animal.filter((a) => !a.id_adopter);
    setAnimalData(availableAnimals);
  }, [animal]);

  const selectedAnimal = animalData.find((a) => a.id_animal === value);

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
              disabled={disabled}
            >
              {selectedAnimal ? selectedAnimal.animal_name : "Select Animal..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search animal..." className="h-9" />
              <CommandList>
                <CommandEmpty>No animal found.</CommandEmpty>
                <CommandGroup>
                  {animalData.map((animal) => (
                    <CommandItem
                      key={animal.id_animal}
                      onSelect={() => {
                        onChange(
                          animal.id_animal === value ? "" : animal.id_animal
                        );
                        setOpen(false);
                      }}
                    >
                      {animal.animal_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === animal.id_animal
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

export function AnimalAdopterCombobox({ value, onChange, adopterData }) {
  const [open, setOpen] = useState(false);
  const [AdopterData, setAdopterData] = useState([]);

  useEffect(() => {
    setAdopterData(adopterData);
  }, [adopterData]);

  const selectedAdopter = AdopterData.find((a) => a.id_adopter === value);

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
              {selectedAdopter ? selectedAdopter.name : "Select Adopter..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search Adopter..." className="h-9" />
              <CommandList>
                <CommandEmpty>No adopter found.</CommandEmpty>
                <CommandGroup>
                  {AdopterData.map((adopter) => (
                    <CommandItem
                      key={adopter.id_adopter}
                      onSelect={() => {
                        onChange(
                          adopter.id_adopter === value ? "" : adopter.id_adopter
                        );
                        setOpen(false);
                      }}
                    >
                      {adopter.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === adopter.id_adopter
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
