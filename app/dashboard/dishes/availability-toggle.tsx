"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toggleAvailability } from "@/actions/dishes/toggle-availability";

interface AvailabilityToggleProps {
  id: string;
  available: boolean;
}

export function AvailabilityToggle({ id, available }: AvailabilityToggleProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={available ? "available" : "unavailable"}
      disabled={isPending}
      onValueChange={(val) => startTransition(() => toggleAvailability(id, val === "available"))}
    >
      <SelectTrigger
        aria-label="Dish availability"
        className={cn(
          "h-7 w-full rounded-none px-2.5 text-[10px] font-semibold tracking-wide shadow-none",
          available ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="available" className="text-xs">
          Available
        </SelectItem>
        <SelectItem value="unavailable" className="text-xs">
          Unavailable
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
