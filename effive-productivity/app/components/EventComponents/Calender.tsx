"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="p-4 bg-white w-full h-screen flex flex-col">
      <div>
        <p className="mt-3 text-sm text-gray-700">
          Selected: {value.toDateString()}
        </p>
      </div>
      <Calendar onChange={setValue} value={value} className="rounded" />
    </div>
  );
};

export default MyCalendar;
