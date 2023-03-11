import { motion } from "framer-motion";

const Clock: React.FC<
  React.PropsWithChildren & {
    started?: boolean;
    speed?: number;
    className?: string;
  }
> = ({ started, speed = 2, ...props }) => {
  const generateX = (radius: number) => {
    const resX = [];
    for (let x = 0; x < 360; x++) {
      resX.push(
        Math.round(radius * Math.sin((Math.PI * 2 * x) / 360) * 100) / 100 + 12
      );
    }
    return resX.reverse();
  };
  const generateY = (radius: number) => {
    const resY = [];
    for (let y = 0; y < 360; y++) {
      resY.push(
        Math.round(radius * Math.cos((Math.PI * 2 * y) / 360) * 100) / 100 + 12
      );
    }
    return resY.reverse();
  };

  const minuteX = generateX(7);
  const minuteY = generateY(7);
  const hourX = generateX(5);
  const hourY = generateY(5);

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
        animate={started ? "started" : "stopped"}
        transition={{
          duration: started ? 12 : 1,
          repeat: started ? Infinity : 1,
        }}
        variants={{
          started: {
            x2: hourX,
            y2: hourY,
          },
          stopped: {
            x2: 7,
            y2: 12,
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
        animate={started ? "started" : "stopped"}
        transition={{
          duration: 1,
          repeat: started ? Infinity : 1,
        }}
        variants={{
          started: {
            x2: minuteX,
            y2: minuteY,
          },
          stopped: {
            x2: 12,
            y2: 19,
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
