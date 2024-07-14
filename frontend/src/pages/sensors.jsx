import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  CameraGesture,
  CamerIdentification,
  FlexSensor,
  Gyroscope,
  Speaker,
  Ultrasonic,
} from "@/components";

export const Sensors = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-y-20">
      <button
        className="flex items-center self-start px-6 pt-4 pb-12 text-2xl text-primary-default"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-3" />
        Go Back
      </button>
      <div className="grid grid-flow-row grid-cols-3 gap-8">
        <CameraGesture />
        <CamerIdentification />
        <FlexSensor />
        <Gyroscope />
        <Speaker />
        <Ultrasonic />
      </div>
    </main>
  );
};