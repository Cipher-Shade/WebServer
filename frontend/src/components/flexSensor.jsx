import React, { useState, useEffect } from "react";
import Ok from "@assets/4.png";
import Like from "@assets/5.png";
import ILoveYou from "@assets/6.png";
import Hi from "@assets/7.png";
import Sorry from "@assets/8.png";

export const FlexSensor = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gestures = [
    { image: Ok, text: "OK" },
    { image: Like, text: "Like" },
    { image: ILoveYou, text: "I Love You" },
    { image: Hi, text: "Hi" },
    { image: Sorry, text: "Sorry" },
  ];

  useEffect(() => {
    const toggleGesture = () => {
      const randomIndex = Math.floor(Math.random() * gestures.length);
      setCurrentIndex(randomIndex);
    };

    const randomInterval = Math.floor(Math.random() * 5000) + 1000;
    const timer = setTimeout(toggleGesture, 800);

    return () => clearTimeout(timer);
  }, [currentIndex, gestures.length]);

  const { image, text } = gestures[currentIndex];

  return (
    <div className="min-w-full min-h-full border shadow-xl card bg-primary-variant border-primary-default">
      <div className="grid items-center justify-center text-center card-body">
        <h1 className="pb-10 text-6xl italic font-extrabold text-center capitalize">
          Flex Sensor
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
