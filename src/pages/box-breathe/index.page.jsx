import React, { useState, useEffect, useRef, useCallback } from "react";
import Contributors from "../../components/Contributors";
import CountdownTimer from "../../components/CountdownTimer";

const Page = () => {
  const [breath, setBreath] = useState("Press Start to Begin Excersise");
  const [started, setStarted] = useState(false);
  const [breathTimes, setBreathTimes] = useState({
    inhale: 4,
    hold: 4,
    exhale: 4,
  });
  const [startedWith, setStartedWith] = useState(breathTimes);
  const [showRestart, setShowRestart] = useState(false);
  const circleRef = useRef();
  const circleTextRef = useRef();
  const timerRef = useRef(null);

  const handleStartStop = () => {
    setShowRestart(false);
    if (started) {
      stop();
      setStarted(false);
      return;
    }
    setStarted(true);
    inhale();
    setStartedWith(breathTimes);
  };

  const updateBreath = (name) => {
    clearTimeout(timerRef.current);
    return new Promise((resolve) => {
      circleTextRef.current.style.opacity = "0";
      timerRef.current = setTimeout(() => {
        setBreath(name);
        circleTextRef.current.style.opacity = "1";
        resolve();
      }, 1000);
    });
  };

  const stop = async () => {
    setBreath("Press Start to Begin Excersise");
    clearTimeout(timerRef.current);
    circleRef.current.style.transform = "scale(33%)";
    circleRef.current.style.transitionDuration = `2s`;
    circleRef.current.style.background = "#F4C152";
  };

  const inhale = async () => {
    clearTimeout(timerRef.current);
    await updateBreath("inhale");
    circleRef.current.style.transform = "scale(100%) rotate(180deg)";
    circleRef.current.style.transitionDuration = `${breathTimes.inhale}s`;
    circleRef.current.style.background = "#3ABFF8";
    circleRef.current.style.borderRadius = "50%";
    timerRef.current = setTimeout(() => {
      hold();
    }, breathTimes.inhale * 1000 - 1000);
  };

  const hold = async () => {
    clearTimeout(timerRef.current);
    await updateBreath("hold");
    circleRef.current.style.background = "#2BD4BD";
    timerRef.current = setTimeout(() => {
      exhale();
    }, breathTimes.hold * 1000 - 1000);
  };

  const hold2 = async () => {
    clearTimeout(timerRef.current);
    await updateBreath("hold");
    circleRef.current.style.background = "#2BD4BD";
    timerRef.current = setTimeout(() => {
      inhale();
    }, breathTimes.hold * 1000 - 1000);
  };

  const exhale = async () => {
    clearTimeout(timerRef.current);
    await updateBreath("exhale");
    circleRef.current.style.transform = "scale(33%) rotate(0deg)";
    circleRef.current.style.transitionDuration = `${breathTimes.exhale}s`;
    circleRef.current.style.background = "#F471B5";
    circleRef.current.style.borderRadius = "75px";
    timerRef.current = setTimeout(() => {
      hold2();
    }, breathTimes.exhale * 1000 - 1000);
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setBreathTimes((currTimes) => {
      return { ...currTimes, [name]: value };
    });
    if (started && Object.keys(startedWith) !== Object.keys(breathTimes)) {
      setShowRestart(true);
    } else {
      setShowRestart(false);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center pb-20">
        <div className="flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden w-full">
          <div
            ref={circleRef}
            className={`relative rounded-[75px] h-[100vw] w-[100vh] max-w-[min(350px,100vw)] max-h-[min(350px,100vw)] bg-warning transition-all ease-linear flex justify-center items-center scale-[33%] rotate-0`}
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
          </div>
          {breath === "inhale" && (
            <CountdownTimer number={breathTimes.inhale} />
          )}
          {breath === "hold" && <CountdownTimer number={breathTimes.hold} />}
          {breath === "exhale" && (
            <CountdownTimer number={breathTimes.exhale} />
          )}
        </div>

        <div className="bg-secondary w-full py-10 px-2 lg:px-10 rounded-2xl flex flex-col items-center shadow-2xl z-10">
          <div
            ref={circleTextRef}
            className="w-full flex items-center justify-center text-secondary-content transition-all duration-500 text-2xl lg:text-4xl capitalize pb-12 text-center"
          >
            {breath}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-5 bg-neutral text-neutral-content shadow-lg rounded-2xl w-full">
            <div className="card w-full">
              <div className="card-body p-4 lg:p-8">
                <button
                  onClick={() => handleStartStop()}
                  className={`btn btn-lg px-12 btn-primary shadow-md ${
                    started ? "btn-error" : "btn-success"
                  }`}
                >
                  {started ? "Stop" : "Start"}
                </button>
                <span>
                  Inhale
                  <code className="text-primary ml-2 bg-base-300 px-3 py-1 rounded-md">
                    {breathTimes.inhale}s
                  </code>
                </span>
                <input
                  name="inhale"
                  type="range"
                  min="1"
                  max="10"
                  value={breathTimes.inhale}
                  className="range range-primary"
                  onChange={handleRangeChange}
                  aria-label='Slider for inhale time'
                />
                <span>
                  Hold
                  <code className="text-success ml-2 bg-base-300 px-3 py-1 rounded-md">
                    {breathTimes.hold}s
                  </code>
                </span>
                <input
                  name="hold"
                  type="range"
                  min="1"
                  max="10"
                  value={breathTimes.hold}
                  className="range range-success"
                  onChange={handleRangeChange}
                  aria-label='Slider for hold time'
                />
                <span>
                  Exhale
                  <code className="text-accent ml-2 bg-base-300 px-3 py-1 rounded-md">
                    {breathTimes.exhale}s
                  </code>
                </span>
                <input
                  name="exhale"
                  type="range"
                  min="1"
                  max="10"
                  value={breathTimes.exhale}
                  className="range range-accent"
                  onChange={handleRangeChange}
                  aria-label='Slider for exhale time'
                />
                <p className="text-warning">
                  {showRestart
                    ? "Restart the excersise for changes to take place."
                    : ""}
                </p>
              </div>
            </div>
            <div className="card w-full self-stretch">
              <div className="card-body p-4 lg:p-8">
                <h3 className="text-2xl lg:text-4xl">Steps:</h3>
                <ol className="list-decimal list-inside">
                  <li className="text-base lg:text-xl">
                    <span className="text-primary">Inhale</span> for{" "}
                    <span className="text-primary">
                      {breathTimes.inhale}{" "}
                      {breathTimes.inhale > 1 ? "seconds" : "second"}
                    </span>
                  </li>
                  <li className="text-base lg:text-xl">
                    <span className="text-success">Hold</span> your breath for{" "}
                    <span className="text-success">
                      {breathTimes.hold}{" "}
                      {breathTimes.hold > 1 ? "seconds" : "second"}
                    </span>
                  </li>
                  <li className="text-base lg:text-xl">
                    <span className="text-accent">Exhale</span> for{" "}
                    <span className="text-accent">
                      {breathTimes.exhale}{" "}
                      {breathTimes.exhale > 1 ? "seconds" : "second"}
                    </span>
                  </li>
                  <li className="text-base lg:text-xl">
                    <span className="text-success">Hold</span> for{" "}
                    <span className="text-success">
                      {breathTimes.hold}{" "}
                      {breathTimes.hold > 1 ? "seconds" : "second"}
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center p-4 gap-8 pb-20">
        <p className="text-xl font-medium">
          Box breathing, also known as "square breathing," is a simple, yet
          effective technique for reducing stress and anxiety.
        </p>
        <p className="text-lg">
          It involves breathing in for a count of four, holding the breath for a
          count of four, exhaling for a count of four, and then holding the
          breath again for a count of four. The process is repeated several
          times and helps to slow down the breathing rate, calm the mind and
          reduce stress levels.
        </p>
        <p className="text-lg">
          By focusing on the breath, box breathing helps to distract from the
          worries and thoughts that may be causing stress or anxiety. It also
          helps to regulate the body's natural "fight or flight" response, which
          can become overactive in stressful situations. The act of inhaling and
          exhaling deeply also stimulates the release of calming chemicals in
          the body, such as endorphins and serotonin.
        </p>
        <p className="text-lg">
          Box breathing can be done anywhere and at any time, making it an
          easily accessible tool for managing stress and anxiety. It can be
          especially helpful during moments of high stress or anxiety, such as
          before a big exam or meeting, or during a panic attack. With regular
          practice, box breathing can become a habit, providing a quick and easy
          way to calm down and regain focus in the moment.
        </p>
        <p className="text-xl font-medium">
          Box breathing is a simple and effective way to manage stress and
          anxiety. By focusing on the breath, it helps to calm the mind and
          reduce stress levels. It can be done anywhere and at any time, making
          it a convenient tool for managing stress in the moment.
        </p>
      </section>
      <Contributors projectName="box-breathe" />
    </>
  );
};

export { Page };
