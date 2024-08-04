/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HandDetectedImg from "@assets/17.png";
import HandUndetectedImg from "@assets/18.png";
import handDetectedSound from '../assets/HandDetected.mp3'

export const CameraGesture = () => {
  const [isOn, setIsOn] = useState(true);
  const [handDetected, setHandDetected] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn((prevIsOn) => !prevIsOn);
    }, Math.floor(Math.random() * 2000) + 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHandGestureData = async () => {
      try {
        const { data } = await axios.get(
          "https://raspi-server.onrender.com/api/v1/hand/latest"
        );
        if (data.handDetected && !handDetected) {
          audioRef.current.play();
        }
        setHandDetected(data.handDetected);
      } catch (error) {
        console.error("Error fetching hand gesture data:", error);
      }
    };

    fetchHandGestureData();
    const interval = setInterval(fetchHandGestureData, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default text-white item">
      <div className="card-body items-center text-center">
        <h1 className="card-title text-2xl italic capitalize">
          Hand detection (delay: 5-10s)
        </h1>
        {/* Conditionally display "Hand detected" */}
        {handDetected ? (
          <>
            <img src={HandDetectedImg} alt="Hand Detected" style={{ width: '180px', height: '180px' }} />
            <p className="font-semibold text-xl capitalize">Hand Detected</p>
          </>
        ) : (
          <>
            <img src={HandUndetectedImg} alt="No Hand Detected"  style={{ width: '180px', height: '180px' }} />
            <p className="font-semibold text-xl capitalize">No hand detected</p>
          </>
        )}
        {/* Button to enable sound */}
        <audio ref={audioRef} src={handDetectedSound} />
      </div>
    </div>
  );
};
