import React, { useState, useEffect } from "react";

const CountdownTimer = ({ number, ...props }) => {
  const [seconds, setSeconds] = useState(number);

  useEffect(() => {
    const stamp = Date.now() + seconds * 1000;
    const interval = setInterval(() => {
      const currStamp = Date.now();
      const change = Math.round((+stamp - +currStamp) / 1000);
      setSeconds(() => {
        if (change > 0) {
          console.log(change);
          return change;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span {...props} className="absolute countdown font-mono text-6xl">
      <span style={{ "--value": seconds }}></span>
    </span>
  );
};

export default CountdownTimer;
