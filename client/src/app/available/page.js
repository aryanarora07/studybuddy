"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [availability, setAvailability] = useState({
    Sunday: "",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
  });
  

  const handleAvailabilityChange = (day, time) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: time,
    }));
  };

 

  return (
    <div className="bg-slate-100 h-screen">
     

      {/* Time availability input */}
      <form className="flex flex-col justify-center items-center mt-8">
        <label className="text-2xl text-[#F15A22] mb-4">Set Availability</label>

        {/* Time availability input for each day */}
        {Object.entries(availability).map(([day, time]) => (
          <div key={day} className="flex items-center mb-4">
            <label className="text-lg" htmlFor={day}>
              {day}:
            </label>
            <input
              id={day}
              type="time"
              value={time}
              onChange={(e) => handleAvailabilityChange(day, e.target.value)}
              className="ml-2 rounded-lg p-2 border-2 border-[#F15A22]"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Login;
