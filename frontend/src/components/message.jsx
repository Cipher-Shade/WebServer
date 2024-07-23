import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Message = () => {
  const [flexData, setFlexData] = useState({ flex1: false, flex2: false, flex3: false, flex4: false, flex5: false });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [message, setMessage] = useState('No message');
  const [prevAccelX, setPrevAccelX] = useState(0);
  const [handDetected, setHandDetected] = useState(false); 
  const [handEverDetected, setHandEverDetected] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    
    const fetchLatestSensorData = async () => {
      try {

        const { data } = await axios.get(
          "http://192.168.100.68:4001/api/v1/hand/latest"
        );
        if (data.handDetected) {
          setHandEverDetected(true); 
        }

        // Fetch distance data
        const distanceResponse = await axios.get('http://192.168.100.68:4001/api/v1/ultrasonicsensor/latest');
        if (distanceResponse.data) {
          setDistance(distanceResponse.data.distance);
        }

        // Fetch flex sensor data
        const flexResponse = await axios.get('http://192.168.100.68:4001/api/v1/flexsensor/latest');
        if (flexResponse.data) {
          setFlexData({
            flex1: flexResponse.data.flex1,
            flex2: flexResponse.data.flex2,
            flex3: flexResponse.data.flex3,
            flex4: flexResponse.data.flex4,
            flex5: flexResponse.data.flex5,
          });
        }

        // Fetch gyro data
        const gyroResponse = await axios.get("http://192.168.100.68:4001/api/v1/gyrosensor/latest");
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

        if (handEverDetected && distance >= 30 && distance <= 40) {
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
        } else {
          newMessage = 'Ensure hand is visible and within 30-40 cm range';
        }

        setMessage(newMessage);
        setPrevAccelX(currentAccelX);
        setHandDetected(data.handDetected);

      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchLatestSensorData();
    const interval = setInterval(fetchLatestSensorData, 6000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [flexData, acceleration, prevAccelX]); // Depend on flexData, acceleration, and prevAccelX to re-evaluate the message when they change

  return (
    <div className="card bg-primary-variant w-96 shadow-xl border border-primary-default  text-white">
    <div className="card-body items-center text-center">
      <h1 className="card-title text-2xl italic capitalize">
        { message }
      </h1>
      {/* <p className="font-semibold text-xl capitalize">
        {isOn ? "On" : "Off"}
      </p> */}
    </div>
  </div>
  );
}
