/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ok from "@/assets/20.png";
import Like from "@/assets/19.png";
import ILoveYou from "@/assets/21.png";
import Hello from "@/assets/23.png";
import No from "@/assets/22.png";

export const Message = () => {
  const gestures = [
    { image: Ok, text: "Okay" },
    { image: Like, text: "Like" },
    { image: ILoveYou, text: "I Love You" },
    { image: Hello, text: "Hello" },
    { image: No, text: "No!!" },
  ];
  const [handEverDetected, setHandEverDetected] = useState(false);
  const [distance, setDistance] = useState(null);
  const [flexData, setFlexData] = useState({
    flex1: false,
    flex2: false,
    flex3: false,
    flex4: false,
    flex5: false,
  });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [message, setMessage] = useState('Place hand in front of camera');
  const [prevAccelX, setPrevAccelX] = useState(0);
  const [handDetected, setHandDetected] = useState(false);

  useEffect(() => {
    const fetchLatestSensorData = async () => {
      try {
        const { data } = await axios.get(
          "https://raspi-server.onrender.com/api/v1/hand/latest"
        );
        if (data.handDetected) {
          setHandEverDetected(true);
        }

        const distanceResponse = await axios.get('https://raspi-server.onrender.com/api/v1/ultrasonicsensor/latest');
        if (distanceResponse.data) {
          setDistance(distanceResponse.data.distance);
        }

        const flexResponse = await axios.get('https://raspi-server.onrender.com/api/v1/flexsensor/latest');
        if (flexResponse.data) {
          setFlexData({
            flex1: flexResponse.data.flex1,
            flex2: flexResponse.data.flex2,
            flex3: flexResponse.data.flex3,
            flex4: flexResponse.data.flex4,
            flex5: flexResponse.data.flex5,
          });
        }

        const gyroResponse = await axios.get("https://raspi-server.onrender.com/api/v1/gyrosensor/latest");
        if (gyroResponse.data.accelerometer && gyroResponse.data.gyroscope) {
          setAcceleration({
            x: +gyroResponse.data.accelerometer.x.toFixed(2),
            y: +gyroResponse.data.accelerometer.y.toFixed(2),
            z: +gyroResponse.data.accelerometer.z.toFixed(2),
          });
        }

        let newMessage = 'Place hand in front of camera';
        const currentAccelX = acceleration.x;
        const gyroSaysHello = (currentAccelX >= -10 && currentAccelX <= -2) || (currentAccelX >= 2 && currentAccelX <= 10);

        const gyroSaysNo = gyroSaysHello;
        const gyroSaysILoveYou = gyroSaysHello;

        const allExceptPin1Bent = flexData.flex2 && flexData.flex3 && flexData.flex4 && flexData.flex5;
        const allExceptPin345Bent = flexData.flex1 && flexData.flex2;
        const pin3AndPin4Bent = flexData.flex3 && flexData.flex4;
        const pin1345Bent = flexData.flex1 && flexData.flex3 && flexData.flex4 && flexData.flex5;

        if (allExceptPin1Bent) {
          newMessage = 'Like';
        } else if (allExceptPin345Bent) {
          newMessage = 'Okay';
        }

        if (pin3AndPin4Bent && gyroSaysILoveYou) {
          newMessage = 'I Love You';
        }

        if (pin1345Bent && gyroSaysNo) {
          newMessage = 'No!!';
        }

        setMessage(newMessage);
        setPrevAccelX(currentAccelX);
        setHandDetected(data.handDetected);

      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchLatestSensorData();
    const interval = setInterval(fetchLatestSensorData, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [flexData, acceleration, prevAccelX]);

  return (
<div className="card bg-primary-variant w-96 shadow-xl border border-primary-default text-white">
  <div className="card-body items-center text-center">
    <h1 className="card-title text-2xl italic capitalize">
      Message (delay: 10s)
    </h1>
    {gestures.map((gesture) => {
      console.log(`Gesture text: ${gesture.text}, Message: ${message}`); // Debugging line
      if (gesture.text === message) {
        return (
          <div key={gesture.text}>
            <img src={gesture.image} alt={gesture.text} style={{ width: '180px', height: '180px' }} />
            <p className="font-semibold text-xl capitalize mt-2">{gesture.text}</p>
          </div>
        );
      }
      return null;
    })}
  </div>
</div>
  );
}
