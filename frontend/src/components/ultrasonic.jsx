import React, { useState, useEffect } from "react";
import Perfect from "@assets/1.png";
import TooNear from "@assets/2.png";
import TooFar from "@assets/3.png";
import HandUndetectedImg from "@assets/10.png";

export const Ultrasonic = () => {
  const [data, setData] = useState({ image: '', text: ''});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raspi-server.onrender.com/api/v1/ultrasonicsensor/latest');
        const result = await response.json();

        if (!result || result.distance === undefined || result.distance === null) {
          setData({ image: HandUndetectedImg, text: 'No data available' });
          return;
        }

        const distance = result.distance;
        let newData = { image: '', text: '' };

        if (distance === 0 || (distance >= 1 && distance <= 29)) {
          newData = { image: TooNear, text: 'Person distance is too near' };
        } else if (distance >= 30 && distance <= 50) {
          newData = { image: Perfect, text: 'Person is in perfect position' };
        } else if (distance >= 51 && distance <= 100) {
          newData = { image: TooFar, text: 'Person distance is too far' };
        }

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({ image: HandUndetectedImg, text: 'No data available' });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500); 

    return () => clearInterval(interval);
  }, []);

  const { image, text } = data;

  return (
    <div className="min-w-full min-h-full border shadow-xl card bg-primary-variant border-primary-default">
      <div className="grid items-center justify-center text-center card-body">
        <h1 className="pb-10 text-6xl italic font-extrabold text-center capitalize">
          Ultrasonic
        </h1>
        <section className="grid items-center justify-center">
          <span className="flex items-center justify-center">
            <img src={image} alt={text} />
          </span>
          <h1 className="pt-6 text-6xl italic font-semibold text-center capitalize">
            {text}
          </h1>
        </section>
      </div>
    </div>
  );
};
