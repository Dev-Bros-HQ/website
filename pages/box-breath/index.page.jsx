import React, { useState, useEffect, useRef } from "react";
import CountdownTimer from "../../components/CountdownTimer";

const Page = () => {
  const [breath, setBreath] = useState("Press Start to Begin Excersise");
  const [started, setStarted] = useState(false);
  const [timeout, setTimerTimeout] = useState();
  const [breathTimes, setBreathTimes] = useState({
    inhale: 4,
    hold: 7,
    exhale: 8,
  });
  const [countdown, setCountdown] = useState();
  const circleRef = useRef();
  const circleTextRef = useRef();

  const handleStartStop = () => {
    if (started) {
      stop();
      setStarted(false);
      return;
    }
    inhale();
    setStarted(true);
  };

  const updateBreath = (name) => {
    return new Promise((resolve) => {
      circleTextRef.current.style.opacity = "0";
      const timer = setTimeout(() => {
        setBreath(name);
        circleTextRef.current.style.opacity = "1";
        clearTimeout(timer);
        resolve();
      }, 500);
    });
  };

  const stop = async () => {
    clearTimeout(timeout);
    circleRef.current.style.transform = "scale(25%)";
    circleRef.current.style.transitionDuration = `2s`;
    circleRef.current.style.background = "#F4C152";
    await updateBreath("Press Start to Begin Excersise");
  };

  const inhale = async () => {
    await updateBreath("inhale");
    circleRef.current.style.transform = "scale(100%)";
    circleRef.current.style.transitionDuration = `${breathTimes.inhale}s`;
    circleRef.current.style.background = "#3ABFF8";
    setTimerTimeout(
      setTimeout(() => {
        hold();
      }, breathTimes.inhale * 1000)
    );
  };

  const hold = async () => {
    await updateBreath("hold");
    circleRef.current.style.background = "#2BD4BD";
    setTimerTimeout(
      setTimeout(() => {
        exhale();
      }, breathTimes.hold * 1000)
    );
  };

  const exhale = async () => {
    await updateBreath("exhale");
    circleRef.current.style.transform = "scale(25%)";
    circleRef.current.style.transitionDuration = `${breathTimes.exhale}s`;
    circleRef.current.style.background = "#F471B5";
    setTimerTimeout(
      setTimeout(() => {
        inhale();
      }, breathTimes.exhale * 1000)
    );
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setBreathTimes((currTimes) => {
      return { ...currTimes, [name]: value };
    });
  };

  return (
    <section className="flex flex-col items-center pb-20">
      <div className="flex flex-col items-center pt-16 pb-8">
        <div
          ref={circleRef}
          className={`relative rounded-full h-[350px] w-[350px] bg-warning transition-all ease-in-out flex justify-center items-center scale-[25%]`}
        >
          <div
            className={`absolute rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutRight_6s_ease_infinite] animate-delay-1000`}
          ></div>
          <div
            className={`absolute rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[4000ms]`}
          ></div>
          <div className="absolute rounded-full rotate-90 h-[100%] w-[100%] bg-inherit">
            <div
              className={`rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[2700ms]`}
            ></div>
          </div>
          <div className="absolute rounded-full -rotate-90 h-[100%] w-[100%] bg-inherit">
            <div
              className={`rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[1700ms]`}
            ></div>
          </div>
          <div className="absolute rounded-full rotate-45 h-[100%] w-[100%] bg-inherit">
            <div
              className={`rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[3100ms]`}
            ></div>
          </div>
          <div className="absolute rounded-full -rotate-45 h-[100%] w-[100%] bg-inherit">
            <div
              className={`rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[5200ms]`}
            ></div>
          </div>
          <div className="absolute rounded-full rotate-[135deg] h-[100%] w-[100%] bg-inherit">
            <div
              className={`rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[700ms]`}
            ></div>
          </div>
          <div className="absolute rounded-full -rotate-[135deg] h-[100%] w-[100%] bg-inherit">
            <div
              className={`rounded-full h-[100%] w-[100%] bg-inherit animate-[zoomOutLeft_6s_ease_infinite] animate-delay-[4800ms]`}
            ></div>
          </div>
          {breath === "inhale" && (
            <CountdownTimer number={breathTimes.inhale} />
          )}
          {breath === "hold" && <CountdownTimer number={breathTimes.hold} />}
          {breath === "exhale" && (
            <CountdownTimer number={breathTimes.exhale} />
          )}
        </div>
      </div>

      <div className="bg-secondary w-full p-10 rounded-2xl flex flex-col items-center shadow-2xl z-10">
        <div
          ref={circleTextRef}
          className="w-full flex items-center justify-center text-secondary-content transition-all duration-500 text-4xl capitalize pb-12"
        >
          {breath}
        </div>
        <div className="flex items-center gap-5 bg-neutral text-neutral-content shadow-lg rounded-2xl">
          <div className="card w-96">
            <div className="card-body">
              <button
                onClick={() => handleStartStop()}
                className={`btn btn-lg px-12 btn-primary shadow-md ${
                  started ? "btn-error" : "btn-success"
                }`}
              >
                {started ? "Stop" : "Start"}
              </button>
              <span>Inhale</span>
              <input
                name="inhale"
                type="range"
                min="1"
                max="10"
                value={breathTimes.inhale}
                className="range range-primary"
                onChange={handleRangeChange}
              />
              <span>Hold</span>
              <input
                name="hold"
                type="range"
                min="1"
                max="10"
                value={breathTimes.hold}
                className="range range-success"
                onChange={handleRangeChange}
              />
              <span>Exhale</span>
              <input
                name="exhale"
                type="range"
                min="1"
                max="10"
                value={breathTimes.exhale}
                className="range range-accent"
                onChange={handleRangeChange}
              />
            </div>
          </div>
          <div className="card w-96 self-stretch">
            <div className="card-body">
              <h3 className="text-4xl">Steps:</h3>
              <ol className="list-decimal list-inside">
                <li className="text-xl">
                  <span className="text-primary">Inhale</span> for{" "}
                  <span className="text-primary">
                    {breathTimes.inhale}{" "}
                    {breathTimes.inhale > 1 ? "seconds" : "second"}
                  </span>
                </li>
                <li className="text-xl">
                  <span className="text-success">Hold</span> your breath for{" "}
                  <span className="text-success">
                    {breathTimes.hold}{" "}
                    {breathTimes.hold > 1 ? "seconds" : "second"}
                  </span>
                </li>
                <li className="text-xl">
                  <span className="text-accent">Exhale</span> for{" "}
                  <span className="text-accent">
                    {breathTimes.exhale}{" "}
                    {breathTimes.exhale > 1 ? "seconds" : "second"}
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Page };
