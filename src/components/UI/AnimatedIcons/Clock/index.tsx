import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Clock: React.FC<
  React.PropsWithChildren & {
    started?: boolean;
    speed?: number;
    className?: string;
  }
> = ({ started, speed = 1, ...props }) => {
  const [currPositions, setCurrPositions] = useState({
    minuteX2: 12,
    minuteY2: 19,
    hourX2: 7,
    hourY2: 12,
  });
  const [positions, setPositions] = useState<{
    minuteX: number[];
    minuteY: number[];
    hourX: number[];
    hourY: number[];
  }>({
    minuteX: [],
    minuteY: [],
    hourX: [],
    hourY: [],
  });
  const minuteRef = useRef({
    x2: { animVal: { value: 0 } },
    y2: { animVal: { value: 0 } },
  });
  const hourRef = useRef({
    x2: { animVal: { value: 0 } },
    y2: { animVal: { value: 0 } },
  });

  const generateX = (radius: number, degree: number) => {
    const resX = [];
    for (let x = -degree; x < 360 - degree; x++) {
      resX.push(
        Math.round(radius * Math.sin((Math.PI * 2 * x) / 360) * 100) / 100 + 12
      );
    }
    return resX.reverse();
  };

  const generateY = (radius: number, degree: number) => {
    const resY = [];
    for (let y = -degree; y < 360 - degree; y++) {
      resY.push(
        Math.round(radius * Math.cos((Math.PI * 2 * y) / 360) * 100) / 100 + 12
      );
    }
    return resY.reverse();
  };

  const getDegree = (x: number, y: number) => {
    return Math.round(Math.atan2(y - 12, x - 12) * (180 / Math.PI)) - 90;
  };

  useEffect(() => {
    setCurrPositions({
      minuteX2: minuteRef?.current?.x2?.animVal?.value || 12,
      minuteY2: minuteRef?.current?.y2?.animVal?.value || 19,
      hourX2: hourRef?.current?.x2?.animVal?.value || 7,
      hourY2: hourRef?.current?.y2?.animVal?.value || 12,
    });
  }, [started]);

  useEffect(() => {
    const minuteDegree = getDegree(
      currPositions.minuteX2 || 12,
      currPositions.minuteY2 || 19
    );
    const hourDegree = getDegree(
      currPositions.hourX2 || 7,
      currPositions.hourY2 || 12
    );
    const minuteX = generateX(6, minuteDegree);
    const minuteY = generateY(6, minuteDegree);
    const hourX = generateX(5, hourDegree);
    const hourY = generateY(5, hourDegree);
    setPositions({ minuteX, minuteY, hourX, hourY });
  }, [currPositions]);

  return (
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.98"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      style={{ transform: "rotate(180deg)" }}
      {...props}
    >
      <motion.line
        // @ts-ignore
        ref={hourRef}
        animate={started ? "started" : "stopped"}
        variants={{
          started: {
            x2: positions.hourX,
            y2: positions.hourY,
            transition: {
              duration: 12 / speed,
              repeat: Infinity,
            },
          },
          stopped: {
            x2: currPositions.hourX2,
            y2: currPositions.hourY2,
            transition: {
              duration: speed,
              repeat: 1,
            },
          },
        }}
        id="hour"
        x1="12"
        y1="12"
        stroke="currentColor"
        strokeWidth="1.98"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.line
        // @ts-ignore
        ref={minuteRef}
        animate={started ? "started" : "stopped"}
        transition={{
          duration: 1 / speed,
        }}
        variants={{
          started: {
            x2: positions.minuteX,
            y2: positions.minuteY,
            transition: {
              repeat: Infinity,
            },
          },
          stopped: {
            x2: currPositions.minuteX2,
            y2: currPositions.minuteY2,
            transition: {
              repeat: 1,
            },
          },
        }}
        id="minute"
        x1="12"
        y1="12"
        stroke="currentColor"
        strokeWidth="1.98"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke="currentColor"
        strokeWidth="1.98"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default Clock;
