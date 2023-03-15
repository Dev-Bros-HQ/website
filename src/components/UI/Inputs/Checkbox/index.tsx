import { AnimatePresence, motion } from "framer-motion";
import React, { ChangeEventHandler, useState } from "react";

export type CheckboxProps = {
  label: string;
  id: string;
  value: boolean;
  onChange: Function;
  color?: string;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  color,
  value,
  onChange,
  className = "",
  ...props
}) => {
  const defaultColor = color ? color : "#6419E5";
  const variants = {
    checked: {
      backgroundColor: `${defaultColor}`,
    },
    unchecked: { backgroundColor: "#fff" },
  };
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 text-neutral ${className}`}
    >
      <motion.span
        initial={false}
        variants={variants}
        animate={value ? "checked" : "unchecked"}
        className={`flex h-7 w-7 items-center justify-center rounded-md border-2 text-white`}
      >
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.98"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        >
          <motion.path
            animate={{ pathLength: value ? 1 : 0 }}
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="1.98"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></motion.path>
        </svg>
      </motion.span>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
        style={{ width: 0, height: 0, visibility: "hidden" }}
        {...props}
      />
      {label}
    </label>
  );
};

export default Checkbox;
