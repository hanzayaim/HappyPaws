import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronsRight } from "lucide-react";

const AnimalCard = ({ name, imageUrl, status, jenis, umur, detailLink }) => {
  return (
    <Card className="w-full max-h-100 rounded-sm shadow-md bg-[#CA8D55]">
      <CardHeader className="text-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded-t-xl"
        />
        <CardTitle className="text-xl text-center font-bold mt-2">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col align-middle items-center gap-1 px-6">
        <Label className="text-lg">Status: {status}</Label>
        <Label className="text-lg">Jenis: {jenis}</Label>
        <Label className="text-lg">Umur: {umur}</Label>
        <a href={detailLink} className="flex items-center justify-center gap-1 hover:underline mt-2">
          View Detail <ChevronsRight className="w-4 h-4" />
        </a>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
