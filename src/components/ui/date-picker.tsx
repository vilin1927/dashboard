import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function DatePicker({ dateRange, onDateRangeChange }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);

  const handlePreset = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    onDateRangeChange({ from, to });
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          "w-[240px] justify-start text-left font-normal",
          !dateRange.from && "text-muted-foreground"
        )}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {dateRange.from && dateRange.to ? (
          <>
            {format(dateRange.from, "LLL dd, y")} -{" "}
            {format(dateRange.to, "LLL dd, y")}
          </>
        ) : (
          <span>Pick a date range</span>
        )}
      </Button>
      {showCalendar && (
        <div className="absolute z-50 mt-2 rounded-md border bg-popover p-4 shadow-md">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handlePreset(7)}
            >
              Last 7 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handlePreset(30)}
            >
              Last 30 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handlePreset(90)}
            >
              Last 90 days
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
