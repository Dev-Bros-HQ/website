import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ number }) => {
  const [seconds, setSeconds] = useState(number);
  const countdownRef = useRef();

  useEffect(() => {
    const stamp = Date.now() + seconds * 1000;
    countdownRef.current.style.opacity = "1";
    const interval = setInterval(() => {
      const currStamp = Date.now();
      const change = Math.round((+stamp - +currStamp) / 1000);
      setSeconds(() => {
        if (change > 0) {
          console.log(change);
          return change;
        }
        countdownRef.current.style.opacity = "0";
        countdownRef.current.style.transitionDelay = "1000ms";
        return 0;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={countdownRef}
      className="absolute flex flex-col p-2 transition-all duration-[500ms] animate-fade-in"
    >
      <span className="countdown font-mono text-6xl text-neutral">
        <span style={{ "--value": seconds }}></span>
      </span>
    </div>
  );
};

export default CountdownTimer;
