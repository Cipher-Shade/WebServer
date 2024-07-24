import React, { useState, useEffect } from "react";
import SpeakerOnImg from "@assets/12.png";
import SpeakerOffImg from "@assets/14.png";

export const Speaker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gestures = [
    { image: SpeakerOnImg, text: "Speaker On" },
    { image: SpeakerOffImg, text: "Speaker Off" },
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
          Speaker
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
