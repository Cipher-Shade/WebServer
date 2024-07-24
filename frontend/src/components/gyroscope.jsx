import React, { useState, useEffect } from "react";
import GyroscopreOnImage from "@assets/16.png";
import GyroscopreOffImage from "@assets/15.png";

export const Gyroscope = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gestures = [
    { image: GyroscopreOnImage, text: "Gyroscope Detected" },
    { image: GyroscopreOffImage, text: "Gyroscope Undetected" },
  ];

  useEffect(() => {
    const toggleGesture = () => {
      const randomIndex = Math.floor(Math.random() * gestures.length);
      setCurrentIndex(randomIndex);
    };

    const randomInterval = Math.floor(Math.random() * 5000) + 1000;
    const timer = setTimeout(toggleGesture, randomInterval);

    return () => clearTimeout(timer);
  }, [currentIndex, gestures.length]);

  const { image, text } = gestures[currentIndex];

  return (
    <div className="min-w-full min-h-full border shadow-xl card bg-primary-variant border-primary-default">
      <div className="grid items-center justify-center text-center card-body">
        <h1 className="pb-10 text-6xl italic font-extrabold text-center capitalize">
          Gyroscope
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
