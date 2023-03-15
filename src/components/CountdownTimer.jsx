import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ number, shadowColor }) => {
  const [seconds, setSeconds] = useState(number - 1);
  const countdownRef = useRef();

  useEffect(() => {
    const stamp = Date.now() + seconds * 1000;
    countdownRef.current.style.opacity = "1";
    const interval = setInterval(() => {
      const currStamp = Date.now();
      const change = Math.round((+stamp - +currStamp) / 1000);
      setSeconds(() => {
        if (change > 0) {
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
      className="absolute flex flex-col transition-all duration-[500ms] animate-fade-in"
      style={{ boxShadow: `inset 0 4px 4px ${shadowColor}` }}
    >
      <span className="countdown font-mono text-6xl text-neutral">
        <span style={{ "--value": seconds + 1 }}></span>
      </span>
    </div>
  );
};

export default CountdownTimer;
