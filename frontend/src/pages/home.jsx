
import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from '@/assets/banner3.png';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-y-32">
      <div className="fixed top-0 left-0 w-full h-96 bg-gray-200 overflow-hidden">
        <img
          src={Banner}
          alt="Banner"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <h1 className="text-4xl text-white text-center">Welcome to Sign Language System</h1>
    </div> */}
      </div>
      <div className="pt-96 flex flex-col items-center gap-y-8">
        <div className="flex flex-row gap-x-8">
          <button
            className="px-8 py-3 bg-primary-variant text-white text-lg font-semibold rounded-lg shadow-md hover:bg-primary-default focus:outline-none focus:ring-2 focus:ring-primary-variant focus:ring-opacity-50 transition duration-300"
            onClick={() => navigate("/charts")}
          >
            Charts
          </button>
          <button
            className="px-8 py-3 bg-primary-variant text-white text-lg font-semibold rounded-lg shadow-md hover:bg-primary-default focus:outline-none focus:ring-2 focus:ring-primary-variant focus:ring-opacity-50 transition duration-300"
            onClick={() => navigate("/sensors")}
          >
            Sensors
          </button>
        </div>
      </div>
    </main>

  );
};
