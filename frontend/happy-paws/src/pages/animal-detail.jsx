import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PencilLine,Trash,ChevronsRight } from "lucide-react"
import { AnimalEditDialog } from "../components/pages-components/animalDialog";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertDialogDelete } from "../components/pages-components/AnimalAlert";
import Layout from "../app/layout";

export default function AnimalDetail(){
    const animal = {
        id_animal: "A001",
        id_shelter: "S001",
        id_adopter: null,
        animal_name: "Luna",
        animal_img: "https://www.allianz.ie/blog/your-pet/choosing-a-pedigree-pet/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1727944382981/cute-happy-pup.jpeg", // dog
        animal_gender: "Female",
        animal_type: "Dog",
        animal_age: 3,
        animal_status: "Available",
        rescue_location: "Jakarta Selatan",
        date: "2024-12-10T10:00:00",
        note: "Friendly and calm temperament",
        created_at: "2024-12-10T10:10:00",
        created_by: "admin001",
        updated_at: "2025-01-01T08:00:00",
        updated_by: "admin001"
    }
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
          id_animal: "A001"
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
          id_animal: "A002"
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
          id_animal: "A003"
        }
      ];
    const { id } = useParams();
    const medicaldatabyId = MedicalData.find((item) => item.id_animal === id);
    const [openEdit, setOpenEdit] = useState(false);
    const [isAlert, setAlert] = useState(false);
    return(
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
                    ><PencilLine /> Edit</Button>
                    <Button
                    className="w-32" 
                    variant="alert"
                    onClick={() => setAlert(true)}
                    >
                        <Trash />Delete
                    </Button>
                </div>
                <AnimalEditDialog open={openEdit} onOpenChange={setOpenEdit} animalData={animal}/>
                <AlertDialogDelete open={isAlert} onOpenChange={setAlert}/>
                <div className="w-full bg-secondary/70 min-h-fit flex flex-col mt-6 px-12 py-20 lg:gap-10 gap-4 rounded-xl">
                    <div className="flex lg:flex-row flex-col h-fit w-full items-center text-center gap-3">
                        <img
                        src={animal.animal_img}
                        alt="imgAnimal"
                        className="w-sm h-50 object-cover rounded-xl "
                        />
                        <Label className="text-3xl font-bold lg:justify-start w-full justify-center">{animal.animal_name}</Label>
                    </div>
                    <div className="flex flex-row h-fit w-full text-center gap-3">
                        <div className="w-full text-start flex flex-col gap-2">
                            <Label className="lg:text-2xl ">Status: {animal.animal_status} </Label>
                            <Label className="lg:text-2xl">Jenis : {animal.animal_type} </Label>
                            <Label className="lg:text-2xl">Umur  : {animal.animal_age} </Label>
                        </div>
                        <div className="w-full  text-start flex flex-col gap-2">
                            <Label className="lg:text-2xl">Rescue location : {animal.rescue_location}</Label>
                            <Label className="lg:text-2xl">Medical Status  : {medicaldatabyId?.medical_status??"Medical Status Belum ada"}</Label>
                            <Label className="lg:text-2xl">
                            Vaccinate Status: {medicaldatabyId?.vaccin_status != null 
                                ? (medicaldatabyId.vaccin_status ? "Sudah Vaksin" : "Belum Vaksin") 
                                : "Vaksin Status Belum ada"}
                            </Label>
                        <div/>
                    </div>
                    </div>
                    <div className="bg-primary/60 h-50 w-full rounded-xl p-3 mt-3">
                        <Label className="text-xl font-bold">Note: </Label>
                        <p className="w-full mx-3 break-words">{animal.note}</p>
                    </div>
                </div>
            </div>
        </Layout>

    );

}