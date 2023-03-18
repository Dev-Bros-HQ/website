import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Text3D: React.FC<
  React.PropsWithChildren & {
    shadowLength?: number;
    gradientAggresiveness?: number;
    shadowColor?: string;
    className?: string;
  }
> = ({
  shadowLength = 50,
  gradientAggresiveness = 50,
  shadowColor = "#5114b9",
  className,
  children,
  ...props
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [shadow, setShadow] = useState("");

  useEffect(() => {
    function shadeColor(color: string, percent: number) {
      var R = parseInt(color.substring(1, 3), 16);
      var G = parseInt(color.substring(3, 5), 16);
      var B = parseInt(color.substring(5, 7), 16);

      R = (R * (100 + percent)) / 100;
      G = (G * (100 + percent)) / 100;
      B = (B * (100 + percent)) / 100;

      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;

      R = Math.round(R);
      G = Math.round(G);
      B = Math.round(B);

      var RR =
        R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
      var GG =
        G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
      var BB =
        B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

      return "#" + RR + GG + BB;
    }
    let shadow = "";
    for (let i = 0; i < shadowLength; i += 1) {
      shadow +=
        (shadow ? "," : "") +
        -i * 1 +
        "px " +
        i * 1 +
        "px 0 " +
        `${shadeColor(
          shadowColor,
          (i / shadowLength) * -gradientAggresiveness
        )}`;
    }
    setShadow(shadow);
  }, [shadowLength, shadowColor, gradientAggresiveness]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: shadowLength, rotate: -10 }}
      ref={textRef}
      animate={{
        opacity: 1,
        y: -shadowLength / 2,
        rotate: -15,
      }}
      transition={{ type: "spring", bounce: 0.65 }}
      style={{
        textShadow: shadow,
      }}
      className={`text-center text-5xl font-bold uppercase md:text-7xl ${className}`}
      {...props}
    >
      {children}
    </motion.h1>
  );
};

export default Text3D;
