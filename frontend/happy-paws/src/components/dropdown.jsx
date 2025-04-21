import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Dropdown({ options, onSelect }) {
  const [selectedItem, setSelectedItem] = useState(options[0] || "Choose");

  const handleSelect = (value) => {
    setSelectedItem(value);
    if (onSelect) onSelect(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">{selectedItem}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => handleSelect(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
