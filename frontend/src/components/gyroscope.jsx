import React, { useState, useEffect } from "react";
import axios from "axios";

export const Gyroscope = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const fetchLatestGyroData = async () => {
      try {
        const { data } = await axios.get(
          "http://192.168.100.68:4001/api/v1/gyrosensor/latest"
        );
        if (data.accelerometer && data.gyroscope) {
          const roundedAccelerometer = {
            x: +data.accelerometer.x.toFixed(2),
            y: +data.accelerometer.y.toFixed(2),
            z: +data.accelerometer.z.toFixed(2),
          };
          const roundedGyroscope = {
            x: +data.gyroscope.x.toFixed(2),
            y: +data.gyroscope.y.toFixed(2),
            z: +data.gyroscope.z.toFixed(2),
          };
          setAcceleration(roundedAccelerometer);
          setRotation(roundedGyroscope);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching latest gyroscope data:", error);
      }
    };

    fetchLatestGyroData();
    const interval = setInterval(fetchLatestGyroData, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default text-white">
      <div className="card-body items-center text-center">
        <h1 className="card-title text-2xl italic capitalize">Gyroscope</h1>
        <div>
          <h2 className="font-semibold text-xl">Acceleration</h2>
          <p>X: {acceleration.x}</p>
          <p>Y: {acceleration.y}</p>
          <p>Z: {acceleration.z}</p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">Rotation</h2>
          <p>X: {rotation.x}</p>
          <p>Y: {rotation.y}</p>
          <p>Z: {rotation.z}</p>
        </div>
      </div>
    </div>
  );
};
