/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Perfect from "@/assets/24.png";
import TooNear from "@/assets/25.png";
import TooFar from "@/assets/26.png";
import HandUndetectedImg from "@/assets/10.png";

export const Ultrasonic = () => {
  // const [distance, setDistance] = useState(0);

  // useEffect(() => {
  //   const fetchLatestDistanceData = async () => {
  //     try {
  //       const { data } = await axios.get('https://raspi-server-1.onrender.com/api/v1/ultrasonicsensor/latest');
  //       if (data.distance !== undefined) {
  //         const roundedDistance = +data.distance.toFixed(2);
  //         setDistance(roundedDistance);
  //       } else {
  //         console.error('Unexpected data structure:', data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching latest distance data:', error);
  //     }
  //   };

  //   fetchLatestDistanceData();
  //   const interval = setInterval(fetchLatestDistanceData, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const [data, setData] = useState({ image: HandUndetectedImg, text: 'No data available' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raspi-server-1.onrender.com/api/v1/ultrasonicsensor/latest');

        const result = await response.json();

        if (!result || result.distance === undefined || result.distance === null) {
          setData({ image: HandUndetectedImg, text: 'No data available' });
          return;
        }

        const distance = result.distance;
        const roundedDistance = +distance.toFixed(2);
        let newData = { image: HandUndetectedImg, text: 'No data available' }; // Default fallback

        if (distance === 0 || (distance >= 1 && distance <= 29)) {
          newData = { image: TooNear, text: `User distance is too near (${roundedDistance} cm)` };
        } else if (distance >= 30 && distance <= 150) {
          newData = { image: Perfect, text: `User is in perfect position (${roundedDistance} cm)` };
        } else if (distance >= 151 && distance <= 400) {
          newData = { image: TooFar, text: `User distance is too far (${roundedDistance} cm)` };
        }

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ image: HandUndetectedImg, text: 'No data available' });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const { image, text } = data;

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default text-white item">
      <div className="card-body items-center text-center item-center">
        <h1 className="card-title text-2xl italic capitalize">User Distance (delay: 7s)</h1>
        <img src={image} alt="No Hand Detected" style={{ width: '180px', height: '180px' }} />
        <p className="font-semibold text-xl">
          {text}
        </p>
      </div>
    </div>
  );
};