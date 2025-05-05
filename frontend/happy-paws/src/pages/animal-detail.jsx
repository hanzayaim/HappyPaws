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
import { medicalData } from "./medical-management";
import { useEffect, useState } from "react";
import axios from "axios";

const user = {
  id_shelter: "SHELTER-79618107-fc06-4adf-bb8a-0e08c95a7f1f",
  owner_name: "Dimas",
  email: "shelter001@gmail.com",
  shelter_name: "Happy Paws Shelter",
  phone_number: "081238697341",
  role: "Owner",
  address: "jln jalan",
};

export default function AnimalDetail() {
  const { id_animal } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [animal, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnimalData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/animals/getAnimalDataById/${user.id_shelter}/${id_animal}`
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
    fetchAnimalData();
  }, [id_animal]);

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
        />
        <DeleteAnimalDialog
          open={isAlert}
          onOpenChange={setAlert}
          animal={animal}
        />
        <div className="w-full bg-[#FAF7F2] shadow-lg min-h-fit flex flex-col p-5 mt-5 gap-5 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Gambar */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-4/5 h-64 bg-white rounded-xl overflow-hidden">
                {animal.animal_img ? (
                  <img
                    src={animal.animal_img}
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
                <Label className="font-medium text-sm">Jenis</Label>
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
