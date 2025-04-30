import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as React from "react";
import AnimalCard from "../components/pages-components/animal-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import Layout from "../app/layout";
import {
  AnimalInDialog,
  AnimalOutDialog,
} from "../components/pages-components/animalDialog";
import { medicalData } from "./medical-management";
import { useParams } from "react-router-dom";

export const AnimalData = [
  {
    id_animal: "A001",
    id_shelter: "S001",
    id_adopter: null,
    animal_name: "Luna",
    animal_img:
      "https://www.allianz.ie/blog/your-pet/choosing-a-pedigree-pet/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1727944382981/cute-happy-pup.jpeg",
    animal_gender: "Female",
    animal_type: "Dog",
    animal_age: 3,
    rescue_location: "Jakarta Selatan",
    date: "2024-12-10T10:00:00",
    note: "Friendly and calm temperament",
    created_at: "2024-12-10T10:10:00",
    created_by: "admin001",
    updated_at: "2025-01-01T08:00:00",
    updated_by: "admin001",
  },
  {
    id_animal: "A002",
    id_shelter: "S001",
    id_adopter: null,
    animal_name: "Max",
    animal_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjtNVIoesRaukkpGZ5ApIKj4iwk_NHzHTqQ&s",
    animal_gender: "Male",
    animal_type: "Cat",
    animal_age: 2,
    rescue_location: "Bandung",
    date: "2025-01-05T09:30:00",
    note: "Playful and sociable",
    created_at: "2025-01-05T09:40:00",
    created_by: "admin002",
    updated_at: "2025-01-20T10:00:00",
    updated_by: "admin002",
  },
  {
    id_animal: "A003",
    id_shelter: "S001",
    id_adopter: null,
    animal_name: "Chiko",
    animal_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXU-y5eqvxHM9Jn8Prs6YcL7oyLqTc0YYoBg&s",
    animal_gender: "Male",
    animal_type: "Rabbit",
    animal_age: 1,
    rescue_location: "Depok",
    date: "2025-03-15T11:00:00",
    note: "Loves to be held",
    created_at: "2025-03-15T11:10:00",
    created_by: "admin001",
    updated_at: "2025-03-16T12:00:00",
    updated_by: "admin001",
  },
  {
    id_animal: "A004",
    id_shelter: "S001",
    id_adopter: null,
    animal_name: "Molly",
    animal_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3JXXh0WgbF0UY8Tk499nwF8MMkyB9JWxmQ&s", // dog
    animal_gender: "Female",
    animal_type: "Dog",
    animal_age: 5,
    rescue_location: "Tangerang",
    date: "2025-02-20T08:00:00",
    note: "Needs daily walks",
    created_at: "2025-02-20T08:10:00",
    created_by: "admin003",
    updated_at: "2025-03-01T09:00:00",
    updated_by: "admin003",
  },
  {
    id_animal: "A005",
    id_shelter: "S001",
    id_adopter: null,
    animal_name: "Shadow",
    animal_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dI-pt8pKDIJS0_OGw0bzEh1nP4tnjzqKiA&s",
    animal_gender: "Male",
    animal_type: "Cat",
    animal_age: 4,
    rescue_location: "Bekasi",
    date: "2025-04-01T14:00:00",
    note: "Quiet and shy at first",
    created_at: "2025-04-01T14:05:00",
    created_by: "admin002",
    updated_at: "2025-04-05T15:00:00",
    updated_by: "admin002",
  },
];

export function determineAnimalStatus(
  medicalStatus,
  vaccinateStatus,
  adopterId
) {
  if (adopterId) {
    return "Adopted";
  }

  if (medicalStatus === "Healthy" && vaccinateStatus === "Vaccinated") {
    return "Available";
  }

  return "Not Available";
}

export default function AnimalManagement() {
  const [openAnimalIn, setOpenAnimalIn] = useState(false);
  const [openAnimalOut, setOpenAnimalOut] = useState(false);

  const { id } = useParams();

  return (
    <Layout>
      <div className="flex-row min-h-svh bg-gray-50 w-full p-6 md:p-10">
        <div>
          <Label className="text-3xl font-bold">Animal Management</Label>
        </div>
        <div className="flex lg:justify-end md:justify-end sm:justify-center mt-2 gap-3">
          <Button
            className="w-32"
            variant="success"
            onClick={() => setOpenAnimalIn(true)}
          >
            <ArrowDown /> Animal In
          </Button>
          <AnimalInDialog open={openAnimalIn} onOpenChange={setOpenAnimalIn} />
          <Button
            className="w-32"
            variant="alert"
            onClick={() => setOpenAnimalOut(true)}
          >
            <ArrowUp />
            Animal Out
          </Button>
          <AnimalOutDialog
            open={openAnimalOut}
            onOpenChange={setOpenAnimalOut}
          />
        </div>
        <div className="flex pt-3 lg:px-15 md:px-10 justify-center min-h-svh w-full">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-7xl"
          >
            <CarouselContent>
              {Array.from({ length: Math.ceil(AnimalData.length / 2) }).map(
                (_, i) => {
                  const animal1 = AnimalData[i * 2];
                  const animal2 = AnimalData[i * 2 + 1];

                  const medical1 = medicalData?.find(
                    (md) => md.id_animal === animal1?.id_animal
                  );
                  const medical2 = medicalData?.find(
                    (md) => md.id_animal === animal2?.id_animal
                  );
                  const status1 = animal1
                    ? determineAnimalStatus(
                        medical1?.medical_status,
                        medical1?.vaccin_status,
                        animal1.id_adopter
                      )
                    : null;

                  const status2 = animal2
                    ? determineAnimalStatus(
                        medical2?.medical_status,
                        medical2?.vaccin_status,
                        animal2.id_adopter
                      )
                    : null;

                  return (
                    <CarouselItem
                      key={i}
                      className="sm:basis-1 md:basis-1/2 lg:basis-1/4"
                    >
                      <div className="grid grid-rows-2 gap-4 p-2">
                        {animal1 && (
                          <AnimalCard
                            name={animal1.animal_name}
                            imageUrl={animal1.animal_img}
                            status={status1}
                            jenis={animal1.animal_type}
                            umur={animal1.animal_age}
                            detailLink={`/animal-management/animal-detail/${animal1.id_animal}`}
                          />
                        )}
                        {animal2 && (
                          <AnimalCard
                            name={animal2.animal_name}
                            imageUrl={animal2.animal_img}
                            status={status2}
                            jenis={animal2.animal_type}
                            umur={animal2.animal_age}
                            detailLink={`/animal-management/animal-detail/${animal2.id_animal}`}
                          />
                        )}
                      </div>
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </Layout>
  );
}
