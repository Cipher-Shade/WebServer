import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  CameraGesture,
  CameraIdentification,
  FlexSensor,
  Gyroscope,
  Speaker,
  Ultrasonic,
  Message,
} from "@/components";

export const Sensors = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center min-h-screen">
      <button
        className="flex items-center self-start px-6 pt-4 pb-12 text-2xl text-primary-default"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-3" />
        Go Back
      </button>
      <div className="grid grid-flow-row grid-cols-2 px-12 pb-12 gap-x-24 gap-y-12">
        <CameraGesture />
        <CameraIdentification />
        <FlexSensor />
        <Gyroscope />
        {/* <Message /> */}
        <Speaker />
        <Ultrasonic />
      </div>
      {/* <div className="grid grid-flow-row grid-cols-1 gap-8">
      </div> */}
    </main>
  );
};
