import { useState } from "react";
import { DoctorForm, type Doctor } from "@/components/DoctorForm";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleDoctorAdded = (doctor: Doctor) => {
    setDoctors((prev) => [...prev, doctor]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight slide-up">
            UMPI Schedule Manager
          </h1>
          <p className="text-muted-foreground slide-up">
            Organize doctor visitation schedules efficiently
          </p>
        </header>

        <div className="grid md:grid-cols-[400px,1fr] gap-8">
          <DoctorForm onDoctorAdded={handleDoctorAdded} />
          <ScheduleCalendar doctors={doctors} />
        </div>
      </div>
    </div>
  );
};

export default Index;