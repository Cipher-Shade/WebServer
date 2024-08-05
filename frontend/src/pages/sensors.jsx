/* eslint-disable no-unused-vars */
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  CameraGesture,
  FlexSensor,
  Gyroscope,
  Speaker,
  Ultrasonic,
  Message
} from "@/components";

export const Sensors = () => {
  const navigate = useNavigate();

  return (
<main className="flex flex-col items-center justify-start min-h-screen gap-y-8">
  <button
    className="flex items-center self-start px-6 pt-4 text-2xl text-primary-default"
    onClick={() => navigate(-1)}
  >
    <FaArrowLeft className="mr-3" />
    Go Back
  </button>
  <div className="grid grid-cols-3 gap-4">
    <CameraGesture />
    <FlexSensor />
    <Gyroscope />
    <div className="col-span-3 flex justify-center">
      <div className="flex gap-4">
        <Message />
        <Ultrasonic />
      </div>
    </div>
  </div>
</main>


  );
};