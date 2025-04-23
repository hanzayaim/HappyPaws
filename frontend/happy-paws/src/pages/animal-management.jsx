import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import * as React from "react"
 import AnimalCard from "../components/pages-components/animal-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Layout from "../app/layout"

import { ArrowDown,ArrowUp } from "lucide-react"

export default function AnimalManagement(){
    const animals = [
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Dontol",
            status: "available",
            jenis: "Anjing",
            umur: "3 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Denis",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Robe",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Bams",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Donus",
            status: "available",
            jenis: "Anjing",
            umur: "1 tahun",
        }, 
        {
            img: "https://cdn.pixabay.com/photo/2017/07/19/13/50/image-2519144_1280.jpg",
            nama: "Danus",
            status: "available",
            jenis: "Kucing",
            umur: "4 tahun",
        }
    ];

    return(
        <Layout>
            <div className="flex-row min-h-svh bg-gray-100 w-full p-6 md:p-10">
                <div>
                    <Label className="text-3xl font-bold">Animal Management</Label>
                </div>
                <div className="flex lg:justify-end md:justify-end sm:justify-center mt-2 gap-3">
                    <Button className="w-32" variant="success"><ArrowDown /> Animal In</Button>
                    <Button className="w-32" variant="alert"><ArrowUp />Animal Out</Button>
                </div>
                <div className="flex pt-3 lg:px-15 md:px-10 justify-center min-h-svh w-full">
                <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-7xl"
                >
                <CarouselContent>
                    {Array.from({ length: Math.ceil(animals.length / 2) }).map((_, i) => {
                    const animal1 = animals[i * 2];
                    const animal2 = animals[i * 2 + 1];

                    return (
                        <CarouselItem key={i} className="sm:basis-1 md:basis-1/2 lg:basis-1/4">
                        <div className="grid grid-rows-2 gap-4 p-2">
                            {animal1 && (
                            <AnimalCard
                                name = {animal1.nama} 
                                imageUrl = {animal1.img}
                                status = {animal1.status}
                                jenis = {animal1.jenis}
                                umur = {animal1.umur}
                                detailLink ="#"
                            />
                            )}
                            {animal2 && (
                                <AnimalCard
                                name = {animal2.nama} 
                                imageUrl = {animal2.img}
                                status = {animal2.status}
                                jenis = {animal2.jenis}
                                umur = {animal2.umur}
                                detailLink ="#"
                                />
                            )}
                        </div>
                        </CarouselItem>
                    );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
                </div>
            </div>
        </Layout>
    );
}