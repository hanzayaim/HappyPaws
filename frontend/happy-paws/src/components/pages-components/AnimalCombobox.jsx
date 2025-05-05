import React, { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
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

const AdopterData = [
  {
    id_adopter: "AD001",
    adopter_name: "Nina Rahma",
  },
  {
    id_adopter: "AD002",
    adopter_name: "Budi Santoso",
  },
  {
    id_adopter: "AD003",
    adopter_name: "Siti Aminah",
  },
  {
    id_adopter: "AD004",
    adopter_name: "Andre Wijaya",
  },
  {
    id_adopter: "AD005",
    adopter_name: "Lisa Maulida",
  },
  {
    id_adopter: "AD006",
    adopter_name: "Doni gress",
  },
  {
    id_adopter: "AD007",
    adopter_name: "FGGFG",
  },
  {
    id_adopter: "AD008",
    adopter_name: "Dontol Ganteng",
  },
  {
    id_adopter: "AD009",
    adopter_name: "FDFD",
  },
  {
    id_adopter: "AD0010",
    adopter_name: "FDSDFFD",
  },
  {
    id_adopter: "AD011",
    adopter_name: "GDTFGH",
  },
  {
    id_adopter: "AD012",
    adopter_name: "DWA",
  },
];

const user = {
  id_shelter: "SHELTER-79618107-fc06-4adf-bb8a-0e08c95a7f1f",
  owner_name: "Dimas",
  email: "shelter001@gmail.com",
  shelter_name: "Happy Paws Shelter",
  phone_number: "081238697341",
  role: "Owner",
  address: "jln jalan",
};

export function AnimalOutCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [animalData, setAnimalData] = useState([]);

  const fetchAnimalData = async () => {
    try {
      const animalRes = await axios.get(
        ` http://localhost:3000/api/animals/getAnimalData/${user.id_shelter}`
      );

      const animalDataFetch = animalRes.data;

      if (animalDataFetch.error) {
        throw new Error(
          animalDataFetch.message || "Failed to fetch animal data"
        );
      }
      setAnimalData(animalDataFetch);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchAnimalData();
  }, []);

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

export function AnimalNameCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [animalData, setAnimalData] = useState([]);

  const fetchAnimalData = async () => {
    try {
      const animalRes = await axios.get(
        ` http://localhost:3000/api/animals/getAnimalData/${user.id_shelter}`
      );

      const animalDataFetch = animalRes.data;

      if (animalDataFetch.error) {
        throw new Error(
          animalDataFetch.message || "Failed to fetch animal data"
        );
      }
      setAnimalData(animalDataFetch);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchAnimalData();
  }, []);

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

export function AnimalAdopterCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);
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
              {selectedAdopter
                ? selectedAdopter.adopter_name
                : "Select Adopter..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search Adopter..." className="h-9" />
              <CommandList>
                <CommandEmpty>No animal found.</CommandEmpty>
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
                      {adopter.adopter_name}
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
