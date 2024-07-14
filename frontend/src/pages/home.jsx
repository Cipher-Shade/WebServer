
import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-y-32">
      <h1 className="text-6xl text-center capitalize">Sign language system</h1>
      <div className="flex flex-row gap-x-8">
        <button
          className="px-8 btn btn-active bg-primary-variant"
          onClick={() => navigate("/charts")}
        >
          <p className="text-lg hover:text-primary-default">Charts</p>
        </button>
        <button
          className="px-8 btn btn-active bg-primary-variant"
          onClick={() => navigate("/sensors")}
        >
          <p className="text-lg hover:text-primary-default">Sensors</p>
        </button>
      </div>
    </main>
  );
};
