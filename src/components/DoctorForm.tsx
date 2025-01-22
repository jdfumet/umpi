import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  availability: string[];
}

interface DoctorFormProps {
  onDoctorAdded: (doctor: Doctor) => void;
}

export const DoctorForm = ({ onDoctorAdded }: DoctorFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newDoctor: Doctor = {
      id: crypto.randomUUID(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      availability: [],
    };

    onDoctorAdded(newDoctor);
    toast.success("Doctor added successfully");
    setFirstName("");
    setLastName("");
  };

  return (
    <Card className="w-full max-w-md mx-auto fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Register as Doctor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};