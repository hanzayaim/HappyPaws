import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PencilLine,Trash,ChevronsRight } from "lucide-react"

export default function AnimalDetail(){
    const animal = {
        
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Dontol",
            status: "Available",
            jenis: "Anjing",
            umur: "3 tahun",
            Rescue_loc: "Jl.Surabaya",
            Medical_Status: "sehat",
            Vaccinate_Status: "done",
            note: "lornnnnnnnnjlnknkjnnnnnnnnn"
        
    };
    return(
        <div className="flex-row min-h-svh bg-gray-100 w-full p-6 md:p-10">
            <div>
                <Label className="text-3xl font-bold">Animal Management</Label>
            </div>
            <div className="flex lg:justify-end md:justify-end sm:justify-center mt-2 gap-3">
                <Button className="w-fit flex justify-between" variant="success"><PencilLine /> Edit</Button>
                <Button className="w-fit flex justify-between" variant="alert"><Trash />Delete</Button>
            </div>
            <div className="w-full bg-secondary/70 min-h-fit flex flex-col mt-6 px-12 py-20 lg:gap-10 gap-4 rounded-xl">
                <div className="flex lg:flex-row flex-col h-fit w-full text-center gap-3">
                    <img
                    src={animal.img}
                    alt="imgAnimal"
                    className="w-sm h-50 object-cover rounded-xl"
                    />
                    <Label className="text-3xl font-bold lg:justify-start w-full justify-center">{animal.nama}</Label>
                </div>
                <div className="flex flex-row h-fit w-full text-center gap-3">
                    <div className="w-full text-start flex flex-col gap-2">
                        <Label className="lg:text-2xl ">Status: {animal.status} </Label>
                        <Label className="lg:text-2xl">Jenis : {animal.jenis} </Label>
                        <Label className="lg:text-2xl">Umur  : {animal.umur} </Label>
                    </div>
                    <div className="w-full  text-start flex flex-col gap-2">
                        <Label className="lg:text-2xl">Rescue location : {animal.Rescue_loc}</Label>
                        <Label className="lg:text-2xl">Medical Status  : {animal.Medical_Status}</Label>
                        <Label className="lg:text-2xl">Vaccinate Status: {animal.Vaccinate_Status}</Label>
                    <div/>
                </div>
                </div>
                <div className="bg-primary/60 h-50 w-full rounded-xl p-3 mt-3">
                    <Label className="text-xl font-bold">Note: </Label>
                    <p className="w-full mx-3 break-words">{animal.note}</p>
                </div>
            </div>
        </div>

    );

}