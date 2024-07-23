import React, { useState, useEffect } from "react";

export const CamerIdentification = () => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn((prevIsOn) => !prevIsOn);
    }, Math.floor(Math.random() * 2000) + 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default  text-white">
      <div className="card-body items-center text-center">
        <h1 className="card-title text-2xl italic capitalize">
          Camera Identification
        </h1>
        {/* <p className="font-semibold text-xl capitalize">
          {isOn ? "On" : "Off"}
        </p> */}
      </div>
    </div>
  );
};
