import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Months array
const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
const currentYear = new Date().getFullYear();
const startYear = currentYear - 5;

const years = Array.from({ length: 10 }, (_, i) => String(startYear + i));

export function MonthFilterSelect({ value, onChange }) {
  return (
    <Select onValueChange={onChange} value={value ?? "all"}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="Filter by Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {months.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function YearFilterSelect({ value, onChange }) {
  return (
    <Select onValueChange={onChange} value={value ?? "all"}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="Filter by Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
