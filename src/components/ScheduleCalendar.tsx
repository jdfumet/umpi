import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Doctor } from "./DoctorForm";
import { useState } from "react";
import { toast } from "sonner";

interface ScheduleCalendarProps {
  doctors: Doctor[];
}

export const ScheduleCalendar = ({ doctors }: ScheduleCalendarProps) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = ["Morning", "Afternoon"];
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    period: "Morning" | "Afternoon";
  } | null>(null);

  const findReplacement = (
    originalDoctor: Doctor,
    day: string,
    period: "Morning" | "Afternoon"
  ) => {
    const availableDoctors = doctors.filter(
      (d) =>
        d.id !== originalDoctor.id &&
        d.canCover &&
        !d.absences.some(
          (absence) => absence.date === day && absence.period === period
        )
    );

    if (availableDoctors.length === 0) {
      toast.error("No available doctors found for replacement");
      return null;
    }

    // Simple round-robin selection for fair distribution
    return availableDoctors[Math.floor(Math.random() * availableDoctors.length)];
  };

  const handleSlotClick = (day: string, period: "Morning" | "Afternoon") => {
    const doctor = doctors.find((d) => d.availability.includes(`${day}-${period}`));
    if (doctor) {
      setSelectedDoctor(doctor);
      setSelectedSlot({ day, period });

      const replacement = findReplacement(doctor, day, period);
      if (replacement) {
        toast.success(
          `${replacement.firstName} ${replacement.lastName} can cover this slot`
        );
      }
    }
  };

  return (
    <Card className="w-full fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Weekly Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-1"></div>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="col-span-1 text-center font-semibold py-2 bg-muted rounded-md"
            >
              {day}
            </div>
          ))}
          {timeSlots.map((slot) => (
            <React.Fragment key={slot}>
              <div className="col-span-1 flex items-center justify-center font-semibold">
                {slot}
              </div>
              {daysOfWeek.map((day) => {
                const slotKey = `${day}-${slot}`;
                const assignedDoctor = doctors.find((d) =>
                  d.availability.includes(slotKey)
                );
                const hasAbsence =
                  assignedDoctor?.absences.some(
                    (a) => a.date === day && a.period === slot
                  );

                return (
                  <Button
                    key={slotKey}
                    variant="outline"
                    className={`col-span-1 h-full min-h-[80px] p-2 ${
                      hasAbsence ? "bg-red-100" : "hover:bg-accent"
                    }`}
                    onClick={() => handleSlotClick(day, slot as "Morning" | "Afternoon")}
                  >
                    {assignedDoctor && (
                      <div className="text-xs">
                        <p className="font-medium">
                          {assignedDoctor.firstName} {assignedDoctor.lastName}
                        </p>
                        {hasAbsence && (
                          <p className="text-red-500 mt-1">Absent</p>
                        )}
                      </div>
                    )}
                  </Button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};