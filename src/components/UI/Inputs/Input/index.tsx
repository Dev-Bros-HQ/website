import { AnimatePresence, motion } from "framer-motion";
import React, { ChangeEventHandler } from "react";

export type InputProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  labelClassName?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  error,
  className = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <div className={`w-full max-w-lg ${className}`}>
      <div
        className={`group relative w-full rounded-md outline-2 outline-offset-2 outline-primary transition-all duration-75 focus-within:outline focus:outline active:outline`}
      >
        <label
          htmlFor={id}
          className={`absolute flex h-full max-w-full -translate-y-1/2 cursor-text items-center overflow-hidden whitespace-nowrap px-3 font-medium transition-all group-focus-within:-left-3 group-focus-within:-top-[15px] group-focus-within:text-sm ${
            value.length > 0 ? "-top-[15px]" : "top-1/2"
          } ${value.length > 0 ? "text-sm" : "text-lg"} ${
            value.length > 0 ? "-left-3" : "left-0"
          } ${
            value.length < 1 ? "text-neutral" : "text-neutral-content"
          } ${labelClassName}`}
        >
          {label || placeholder}
          {required && <span className="text-error">*</span>}
        </label>
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${id}-error`}
          className={`block w-full rounded-md border border-base-100 bg-white px-4 py-1 text-lg font-medium text-neutral shadow-sm focus:outline-none focus:ring-primary ${
            error ? "border-error focus:border-error focus:ring-error" : ""
          }`}
          {...props}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            id={`${id}-error`}
            className="overflow-hidden text-sm text-red-500"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
