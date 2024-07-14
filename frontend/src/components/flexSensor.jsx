import React, { useState, useEffect } from "react";

export const FlexSensor = () => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn((prevIsOn) => !prevIsOn);
    }, Math.floor(Math.random() * 2000) + 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default">
      <figure className="px-10 pt-10">
        <div className={`avatar ${isOn ? "online" : "offline"}`}>
          <div className="w-24 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Avatar"
            />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h1 className="card-title text-2xl italic capitalize">Flex sensor</h1>
        <p className="font-semibold text-xl capitalize">
          {isOn ? "On" : "Off"}
        </p>
      </div>
    </div>
  );
};
