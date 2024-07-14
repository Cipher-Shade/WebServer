import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Gyroscope = ({ onDataUpdate }) => {
  useEffect(() => {
    const fetchLatestGyroData = async () => {
      try {
        const { data } = await axios.get(
          "http://192.168.100.68:4001/api/v1/gyrosensor/latest"
        );
        if (data.accelerometer && data.gyroscope) {
          const roundedAccelerometer = {
            x: +data.accelerometer.x.toFixed(2),
            y: +data.accelerometer.y.toFixed(2),
            z: +data.accelerometer.z.toFixed(2),
          };
          const roundedGyroscope = {
            x: +data.gyroscope.x.toFixed(2),
            y: +data.gyroscope.y.toFixed(2),
            z: +data.gyroscope.z.toFixed(2),
          };
          onDataUpdate({
            accelerometer: roundedAccelerometer,
            gyroscope: roundedGyroscope,
          });
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching latest gyroscope data:", error);
      }
    };

    fetchLatestGyroData();
    const interval = setInterval(fetchLatestGyroData, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [onDataUpdate]);

  return null;
};

export const LineChartSensor = () => {
  const [data, setData] = useState([]);

  const handleDataUpdate = (gyroData) => {
    setData((prevData) => [
      ...prevData,
      {
        name: prevData.length + 1,
        x: gyroData.accelerometer.x,
        y: gyroData.accelerometer.y,
        z: gyroData.accelerometer.z,
      },
    ]);
  };

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: "none", width: "100%" }}
    >
      <Gyroscope onDataUpdate={handleDataUpdate} />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            type="natural"
            dataKey="x"
            stroke="#8884d8"
            animationDuration={300}
          />
          <Line
            type="natural"
            dataKey="y"
            stroke="#82ca9d"
            animationDuration={300}
          />
          <Line
            type="natural"
            dataKey="z"
            stroke="#ffc658"
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
