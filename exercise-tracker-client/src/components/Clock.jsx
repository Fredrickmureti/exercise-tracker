import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import './Clock.css';

const { Text } = Typography;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <Text strong>{time.toLocaleTimeString()}</Text>
    </div>
  );
};

export default Clock;