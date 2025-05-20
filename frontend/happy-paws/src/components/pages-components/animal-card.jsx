import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronsRight, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const AnimalCard = ({
  name,
  imageUrl,
  status,
  jenis,
  umur,
  gender,
  detailLink,
}) => {
  return (
    <Card className="w-full max-h rounded-lg shadow-md bg-[#FAF7F2]">
      <CardHeader>
        {imageUrl ? (
          <img
            src={`data:image/jpeg;base64,${imageUrl}`}
            alt="imgAnimal"
            className="w-full h-40 object-cover rounded-t-xl"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-40 object-cover rounded-t-xl">
            <Image color="#b0b0b0" className="w-20 h-20" strokeWidth={1} />
          </div>
        )}
        <CardTitle className="text-xl text-center text-[#EC8C5B] font-semibold mt-2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-1 px-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
          <Label className="text-lg md:text-sm">Status</Label>
          <span
            className={`text-lg md:text-sm ${
              status === "Available" ? "text-[#26B521]" : "text-red-500"
            } font-medium`}
          >
            : {status}
          </span>

          <Label className="text-lg md:text-sm">Gender</Label>
          <span className="text-lg md:text-sm">
            : {gender ? gender : "Unknown"}
          </span>

          <Label className="text-lg md:text-sm">Type</Label>
          <span className="text-lg md:text-sm truncate">
            : {jenis ? jenis : "Unknown"}
          </span>
          <Label className="text-lg md:text-sm">Age</Label>
          <span className="text-lg md:text-sm">: {umur ? umur : "No Age"}</span>
        </div>
        <Button className="w-auto mt-2 bg-[#F97316] hover:bg-[#EA580C] text-white">
          <Link
            to={detailLink}
            className="flex items-center md:text-sm justify-center gap-1"
          >
            View Detail <ChevronsRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
