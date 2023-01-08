import React, { useState, useEffect } from "react";

const Page = () => {
  const [breath, setBreath] = useState("inhale");
  const [circleSize, setCircleSize] = useState(0);

  const inhale = () => {
    setBreath("inhale");
  };
  const holdBreath = () => {};
  const exhale = () => {};

  return (
    <section className="flex flex-col items-center">
      <div
        className={`relative rounded-full h-32 w-32 bg-yellow-400 ${
          circleSize === 0 ? "scale-0" : "scale-100"
        } transition-all duration-700`}
      >
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          {breath}
        </div>
      </div>
      <button onClick={inhale} className="btn btn-primary">
        Start
      </button>
    </section>
  );
};

export { Page };
