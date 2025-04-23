import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const categories = ["Makanan Basah", "Makanan Kering"];
const types = ["Beli", "Donasi"];

export function FoodCombobox({ category, setCategory, type, setType }) {
  console.log("Rendering FoodCombobox: ", { category, type })
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {category || "Choose category"}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-2">
            {categories.map((item) => (
              <div
                key={item}
                onClick={() => setCategory(item)}
                className={cn(
                  "cursor-pointer px-2 py-1 rounded hover:bg-gray-100 flex items-center justify-between",
                  category === item && "bg-gray-100 font-semibold"
                )}
              >
                {item}
                {category === item && <Check className="h-4 w-4" />}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {type || "Choose type"}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-2">
            {types.map((item) => (
              <div
                key={item}
                onClick={() => setType(item)}
                className={cn(
                  "cursor-pointer px-2 py-1 rounded hover:bg-gray-100 flex items-center justify-between",
                  type === item && "bg-gray-100 font-semibold"
                )}
              >
                {item}
                {type === item && <Check className="h-4 w-4" />}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
