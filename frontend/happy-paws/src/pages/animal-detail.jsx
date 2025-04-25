import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash } from "lucide-react";
import { AnimalEditDialog } from "../components/pages-components/animalDialog";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertDialogDelete } from "../components/pages-components/AnimalAlert";
import Layout from "../app/layout";

export default function AnimalDetail() {
  const animal = {
    id_animal: "A001",
    id_shelter: "S001",
    id_adopter: null,
    animal_name: "Luna",
    animal_img:
      "https://www.allianz.ie/blog/your-pet/choosing-a-pedigree-pet/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1727944382981/cute-happy-pup.jpeg", // dog
    animal_gender: "Female",
    animal_type: "Dog",
    animal_age: 3,
    animal_status: "Available",
    rescue_location:
      "Jl. Anggrek No. 25 RT 003 / RW 007, Kelurahan Pondok Bambu, Kecamatan Duren Sawit, Kota Jakarta Timur, Provinsi DKI Jakarta, Kode Pos 13430",
    date: "2024-12-10T10:00:00",
    note: "Friendly and calm temperaments",
    created_at: "2024-12-10T10:10:00",
    created_by: "admin001",
    updated_at: "2025-01-01T08:00:00",
    updated_by: "admin001",
  };
  const MedicalData = [
    {
      id_medical: "M001",
      medical_status: "Healthy",
      vaccin_status: true,
      medical_date_in: "2024-12-11T09:00:00",
      medical_date_out: "2024-12-11T11:00:00",
      medical_cost: 150000,
      note: "Initial health check and vaccination completed",
      created_at: "2024-12-11T11:10:00",
      created_by: "vet001",
      updated_at: "2024-12-11T11:10:00",
      updated_by: "vet001",
      id_shelter: "S001",
      id_animal: "A001",
    },
    {
      id_medical: "M002",
      medical_status: "Observation",
      vaccin_status: true,
      medical_date_in: "2025-01-15T10:00:00",
      medical_date_out: "2025-01-17T10:00:00",
      medical_cost: 300000,
      note: "Mild digestive issue, monitored for two days",
      created_at: "2025-01-17T10:10:00",
      created_by: "vet002",
      updated_at: "2025-01-17T10:10:00",
      updated_by: "vet002",
      id_shelter: "S001",
      id_animal: "A002",
    },
    {
      id_medical: "M003",
      medical_status: "Healthy",
      vaccin_status: true,
      medical_date_in: "2025-03-01T08:30:00",
      medical_date_out: "2025-03-01T09:00:00",
      medical_cost: 100000,
      note: "Regular monthly check-up",
      created_at: "2025-03-01T09:05:00",
      created_by: "vet003",
      updated_at: "2025-03-01T09:05:00",
      updated_by: "vet003",
      id_shelter: "S001",
      id_animal: "A003",
    },
  ];
  const { id } = useParams();
  const medicaldatabyId = MedicalData.find((item) => item.id_animal === id);
  const [openEdit, setOpenEdit] = useState(false);
  const [isAlert, setAlert] = useState(false);
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
        <AlertDialogDelete open={isAlert} onOpenChange={setAlert} />
        <div className="w-full bg-[#FAF7F2] shadow-lg min-h-fit flex flex-col p-5 mt-5 gap-5 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Gambar */}
            <div className="w-full lg:w-1/2">
              <img
                src={animal.animal_img}
                alt="imgAnimal"
                className="object-cover rounded-xl"
              />
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
                    animal.animal_status === "Available"
                      ? "text-[#26B521]"
                      : "text-red-500"
                  }`}
                >
                  {animal.animal_status}
                </span>

                <Label className="font-medium text-sm">Jenis</Label>
                <span className="text-sm"> {animal.animal_type}</span>

                <Label className="font-medium text-sm ">Umur</Label>
                <span className="text-sm">{animal.animal_age} Tahun</span>

                <Label className="font-medium text-sm ">Rescue Location</Label>
                <span className="text-sm">{animal.rescue_location}</span>

                <Label className="font-medium text-sm">Medical Status</Label>
                <span className="text-sm">
                  {medicaldatabyId?.medical_status ?? "Belum Ada"}
                </span>

                <Label className="font-medium text-sm">Vaccinate Status</Label>
                <span className="text-sm">
                  {medicaldatabyId?.vaccin_status != null
                    ? medicaldatabyId.vaccin_status
                      ? "Sudah Vaksin"
                      : "Belum Vaksin"
                    : "Belum Ada"}
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
