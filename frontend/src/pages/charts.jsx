import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LineChartSensor, BarChartSensor, PieChartSensor } from "@/components";

export const Charts = () => {
  const navigate = useNavigate();
  return (
    <main>
      <button
        className="flex items-center self-start px-6 pt-4 text-2xl text-primary-default"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-3" />
        Go Back
      </button>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full px-24">
          <LineChartSensor />

          <div className="flex gap-6 mt-6">
            <div className="flex-1">
              <BarChartSensor />
            </div>
            <div className="flex-1">
              <PieChartSensor />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};