import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doctor } from "./DoctorForm";

interface ScheduleCalendarProps {
  doctors: Doctor[];
}

export const ScheduleCalendar = ({ doctors }: ScheduleCalendarProps) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = ["Morning", "Afternoon"];

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
            <>
              <div
                key={slot}
                className="col-span-1 flex items-center justify-center font-semibold"
              >
                {slot}
              </div>
              {daysOfWeek.map((day) => (
                <div
                  key={`${day}-${slot}`}
                  className="col-span-1 aspect-[4/3] bg-accent/50 rounded-md p-2 text-sm hover:bg-accent transition-colors"
                >
                  {doctors.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      No doctor assigned
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};