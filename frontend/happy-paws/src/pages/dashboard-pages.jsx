import { Label } from "@radix-ui/react-label";
import Layout from "../app/layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import AnimalCard from "../components/pages-components/animal-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { determineAnimalStatus } from "./animal-management";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [AnimalData, setAnimalData] = useState([]);
  const currentUser = async () => {
    try {
      const storedUserType = localStorage.getItem("userType");
      const storedUserData = localStorage.getItem("userData");

      if (storedUserType && storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error user data", error);
    }
  };
  const fetchAnimalData = async () => {
    try {
      const [animalRes, medicalRes] = await Promise.allSettled([
        axios.get(`/api/animals/getAnimalData/${userData.id_shelter}`),
        axios.get(`/api/medical/getMedicalData/${userData.id_shelter}`),
      ]);

      if (animalRes.status !== "fulfilled") {
        throw new Error("Failed to fetch animal data");
      }

      const animalDataFetch = animalRes.value.data;
      const medicalDataFetch =
        medicalRes.status === "fulfilled"
          ? medicalRes.value.data
          : { data: [] };

      const enrichedAnimalData = (animalDataFetch.data || []).map((animal) => {
        const medical = (medicalDataFetch.data || []).find(
          (m) => m.id_animal === animal.id_animal
        );

        const animal_status = determineAnimalStatus(
          medical?.medical_status,
          medical?.vaccin_status,
          animal.id_adopter
        );

        return {
          ...animal,
          animal_status,
        };
      });

      setAnimalData(enrichedAnimalData);
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);
  useEffect(() => {
    if (userData) {
      fetchAnimalData();
    }
  }, [userData]);

  if (!userData) {
    return (
      <Card className="text-center w-auto h-auto gap-2 justify-center bg-primary/90 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Loading...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center">
          <div>Please wait</div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Layout>
      <div className="flex-row min-h-svh bg-gray-50 w-full p-6 md:p-10">
        <div className="flex flex-col">
          <Label className="lg:text-3xl md:text-2xl font-bold text-xl">
            Dashboard
          </Label>
          <Label className="lg:text-2xl md:text-xl text-lg">
            Selamat Datang, {userData?.owner_name || userData?.name}
          </Label>
        </div>
        <div className="flex  mt-2 gap-3">
          <Label className="lg:text-xl md:text-xl text-sm">
            Daftar Hewan Shelter
          </Label>
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
                            status={animal1.animal_status}
                            jenis={animal1.animal_type}
                            umur={animal1.animal_age}
                            detailLink={`/animal-management/animal-detail/${animal1.id_animal}`}
                          />
                        )}
                        {animal2 && (
                          <AnimalCard
                            name={animal2.animal_name}
                            imageUrl={animal2.animal_img}
                            status={animal2.animal_status}
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
