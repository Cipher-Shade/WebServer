import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Ultrasonic = () => {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const fetchLatestDistanceData = async () => {
      try {
        const { data } = await axios.get('http://192.168.100.68:4001/api/v1/ultrasonicsensor/latest');
        if (data.distance !== undefined) {
          const roundedDistance = +data.distance.toFixed(2);
          setDistance(roundedDistance);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching latest distance data:', error);
      }
    };

    fetchLatestDistanceData();
    const interval = setInterval(fetchLatestDistanceData, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default text-white item">
      <div className="card-body items-center text-center item-center">
        <h1 className="card-title text-2xl italic capitalize">Ultrasonic</h1>
        <p className="font-semibold text-xl capitalize">
          Distance: {distance} centimeters
        </p>
      </div>
    </div>
  );
};