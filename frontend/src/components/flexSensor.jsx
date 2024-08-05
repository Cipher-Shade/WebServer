/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from 'axios'; // Ensure axios is imported

export const FlexSensor = () => {
  const [flexData, setFlexData] = useState({
    flex1: false,
    flex2: false,
    flex3: false,
    flex4: false,
    flex5: false,
  });

  useEffect(() => {
    const fetchLatestFlexSensorData = async () => {
      try {
        const { data } = await axios.get('https://raspi-server-1.onrender.com/api/v1/flexsensor/latest');
        if (data) {
          setFlexData({
            flex1: data.flex1,
            flex2: data.flex2,
            flex3: data.flex3,
            flex4: data.flex4,
            flex5: data.flex5,
          });
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching latest flex sensor data:', error);
      }
    };

    fetchLatestFlexSensorData();
    const interval = setInterval(fetchLatestFlexSensorData, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default text-white">
      <div className="card-body items-center text-center">
        <h1 className="card-title text-2xl italic capitalize">Finger Bend Status (delay: 5-10s)</h1>
        <p className="font-semibold text-xl capitalize mb-0">Thumb: {flexData.flex1 ? "Bent" : "Not Bent"}</p>
        <p className="font-semibold text-xl capitalize mb-0">Point: {flexData.flex2 ? "Bent" : "Not Bent"}</p>
        <p className="font-semibold text-xl capitalize mb-0">Middle: {flexData.flex3 ? "Bent" : "Not Bent"}</p>
        <p className="font-semibold text-xl capitalize mb-0">Ring: {flexData.flex4 ? "Bent" : "Not Bent"}</p>
        <p className="font-semibold text-xl capitalize mb-0">Pinky: {flexData.flex5 ? "Bent" : "Not Bent"}</p>
      </div>
    </div>
  );
};