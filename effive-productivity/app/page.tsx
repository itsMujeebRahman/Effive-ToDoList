"use client";
import React from "react";
import Tasks from "./components/TaskComponents/Tasks";
import Finished from "./components/TaskComponents/Finished";

const page = () => {
  return (
    <div className="h-screen grid grid-cols-2">
      <Tasks />
      <Finished />
    </div>
  );
};

export default page;
