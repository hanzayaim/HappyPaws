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
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import Layout from "../app/layout";
import {
  AnimalInDialog,
  AnimalOutDialog,
} from "../components/pages-components/animalDialog";
import axios from "axios";
import { AlertDialogUser } from "../components/pages-components/AlertDialogUser";
import { useNavigate } from "react-router-dom";

export function determineAnimalStatus(
  medicalStatus,
  vaccinateStatus,
  adopterId
) {
  if (adopterId) return "Adopted";
  if (medicalStatus === "Healthy" && vaccinateStatus === "Vaccinated")
    return "Available";
  return "Not Available";
}

export default function AnimalManagement() {
  const [openAnimalIn, setOpenAnimalIn] = useState(false);
  const [openAnimalOut, setOpenAnimalOut] = useState(false);
  const [animalData, setAnimalData] = useState([]);
  const [adopterData, setAdopter] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [openAlertUser, setOpenAlertUser] = useState(false);
  const navigate = useNavigate();
  const currentUser = async () => {
    try {
      const response = await axios.get("/api/auth/profile", {
        withCredentials: true,
      });
      if (response) {
        setUserType(response.data.userType);
        setUserData(response.data.profile);
      }
    } catch (error) {
      console.error("Error user data", error);
      navigate("/login");
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

  const fetchAdopterData = async () => {
    try {
      const adopterRes = await axios.get(
        `/api/adopters/getAdopterData/${userData.id_shelter}`
      );
      const adopterData = adopterRes.data;

      if (adopterData.error) {
        setAdopter([]);
        console.error("Error fetching adopter data:", adopterRes.data.error);
      }

      setAdopter(adopterData.data || []);
    } catch (error) {
      console.error("Error fetching adopter data:", error);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);
  useEffect(() => {
    if (userData && userData.id_shelter) {
      if (
        (userType === "employee" && userData?.role === "Administrator") ||
        (userType === "shelter" && userData?.role === "Owner")
      ) {
        fetchAnimalData();
        fetchAdopterData();
      } else {
        setOpenAlertUser(true);
      }
    }
  }, [userData]);

  return (
    <Layout>
      <div className="flex-row min-h-svh bg-gray-50 w-full p-6 md:p-10">
        <div>
          <Label className="text-3xl font-bold">Animal Management</Label>
          <AlertDialogUser
            desc={
              "This feature just can be access by Owner shelter or Admin Employee"
            }
            open={openAlertUser}
            onOpenChange={setOpenAlertUser}
          />
        </div>
        <div className="flex lg:justify-end md:justify-end sm:justify-center mt-2 gap-3">
          <Button
            className="w-32"
            variant="success"
            onClick={() => setOpenAnimalIn(true)}
          >
            <ArrowDown /> Animal In
          </Button>
          <AnimalInDialog
            open={openAnimalIn}
            onOpenChange={setOpenAnimalIn}
            User={userData}
            fetchData={fetchAnimalData}
          />
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
            animalData={animalData}
            adopterData={adopterData}
            User={userData}
            fetchData={fetchAnimalData}
          />
        </div>
        <div className="flex pt-3 lg:px-15 md:px-10 justify-center min-h-svh w-full">
          <Carousel opts={{ align: "start" }} className="w-full max-w-7xl">
            <CarouselContent>
              {Array.from({ length: Math.ceil(animalData.length / 2) }).map(
                (_, i) => {
                  const animal1 = animalData[i * 2];
                  const animal2 = animalData[i * 2 + 1];

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
                            gender={animal1.animal_gender}
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
                            gender={animal2.animal_gender}
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
