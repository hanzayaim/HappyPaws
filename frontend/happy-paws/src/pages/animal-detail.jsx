import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image, PencilLine, Trash } from "lucide-react";
import {
  AnimalEditDialog,
  DeleteAnimalDialog,
} from "../components/pages-components/animalDialog";
import { useParams } from "react-router-dom";
import Layout from "../app/layout";
import { determineAnimalStatus } from "./animal-management";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnimalDetail() {
  const { id_animal } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [animal, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicalData, setMedicalData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);

  const currentUser = async () => {
    try {
      const storedUserType = localStorage.getItem("userType");
      const storedUserData = localStorage.getItem("userData");

      if (storedUserType && storedUserData) {
        setUserType(storedUserType);
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error("Error user data", error);
    }
  };

  const fetchMedicalData = async () => {
    try {
      const medicalRes = await axios.get(
        `/api/medical/getMedicalData/${userData.id_shelter}`
      );

      const medicalDataFetch = medicalRes.data;

      if (medicalDataFetch.error) {
        throw new Error(
          medicalDataFetch.message || "Failed to fetch animal data"
        );
      }
      setMedicalData(medicalDataFetch.data || []);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const fetchAnimalData = async () => {
    try {
      const { data } = await axios.get(
        `/api/animals/getAnimalDataById/${userData.id_shelter}/${id_animal}`
      );
      const animalDataFetch = data.data;

      setAnimalData(animalDataFetch);
    } catch (error) {
      console.error("error fetching data", error);
    } finally {
      setLoading(false);
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
        fetchMedicalData();
      } else {
        setOpenAlertUser(true);
      }
    }
  }, [userData, id_animal]);

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-xl text-gray-600 animate-pulse">
          Loading animal data...
        </div>
      </Layout>
    );
  }

  const medicaldatabyId = medicalData.find(
    (item) => item.id_animal === id_animal
  );

  const status = determineAnimalStatus(
    medicaldatabyId?.medical_status,
    medicaldatabyId?.vaccin_status,
    animal?.id_adopter
  );

  return (
    <Layout>
      <div className="flex-row min-h-svh bg-gray-100 w-full p-6 md:p-10">
        <div>
          <Label className="text-3xl font-bold">Animal Management</Label>
        </div>
        <div className="flex lg:justify-end md:justify-end sm:justify-center mt-2 gap-3">
          <Button
            className="w-32"
            variant="success"
            onClick={() => setOpenEdit(true)}
          >
            <PencilLine /> Edit
          </Button>
          <Button
            className="w-32"
            variant="alert"
            onClick={() => setAlert(true)}
          >
            <Trash />
            Delete
          </Button>
        </div>
        <AnimalEditDialog
          open={openEdit}
          onOpenChange={setOpenEdit}
          animalData={animal}
          User={userData}
          fetchData={fetchAnimalData}
          id_animal={id_animal}
        />
        <DeleteAnimalDialog
          open={isAlert}
          onOpenChange={setAlert}
          User={userData}
          fetchData={fetchAnimalData}
          id_animal={id_animal}
        />

        <div className="w-full bg-[#FAF7F2] shadow-lg min-h-fit flex flex-col p-5 mt-5 gap-5 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Gambar */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-4/5 h-64 bg-white rounded-xl overflow-hidden">
                {animal.animal_img ? (
                  <img
                    src={`data:image/jpeg;base64,${animal.animal_img}`}
                    alt="imgAnimal"
                    className="absolute top-1/2 left-1/2 w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Image
                      color="#b0b0b0"
                      className="w-20 h-20"
                      strokeWidth={1}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Detail */}
            <div className="w-full lg:w-1/2 text-start">
              <Label className="text-3xl font-bold mb-4">
                {animal.animal_name}
              </Label>
              <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-justify border border-gray-300 rounded-md p-4 bg-[#FFF9F2] shadow-sm">
                <Label className="font-medium text-sm ">Status</Label>
                <span
                  className={`text-sm font-semibold ${
                    status === "Available" ? "text-[#26B521]" : "text-red-500"
                  }`}
                >
                  {status}
                </span>
                <Label className="font-medium text-sm">Gender</Label>
                <span className="text-sm">
                  {" "}
                  {animal?.animal_gender !== null
                    ? animal.animal_gender
                    : "No Gender"}
                </span>
                <Label className="font-medium text-sm">Type</Label>
                <span className="text-sm">
                  {" "}
                  {animal?.animal_type !== null
                    ? animal.animal_type
                    : "No Type"}
                </span>
                <Label className="font-medium text-sm ">Umur</Label>
                <span className="text-sm">
                  {animal?.animal_age != null ? animal.animal_age : "No Age"}{" "}
                  Tahun
                </span>
                <Label className="font-medium text-sm">Date In</Label>
                <span className="text-sm">
                  {animal?.date != null
                    ? new Date(animal.date).toLocaleDateString()
                    : "No Date"}
                </span>
                <Label className="font-medium text-sm ">Rescue Location</Label>
                <span className="text-sm">
                  {animal?.rescue_location != null
                    ? animal.rescue_location
                    : "No Rescue Location"}
                </span>
                <Label className="font-medium text-sm">Medical Status</Label>
                <span className="text-sm">
                  {medicaldatabyId?.medical_status ?? "No Medical data"}
                </span>
                <Label className="font-medium text-sm">Vaccinate Status</Label>
                <span className="text-sm">
                  {medicaldatabyId?.vaccin_status != null
                    ? medicaldatabyId.vaccin_status
                    : "No Medical data"}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#EC8C5B] text-[#FFF9F2] h-50 w-full rounded-xl p-3 mt-3">
            <Label className="text-xl font-bold">Note: </Label>
            <p className="w-full mx-3 break-words font-normal">{animal.note}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
