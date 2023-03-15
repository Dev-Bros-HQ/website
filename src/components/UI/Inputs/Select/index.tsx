import { useState, useId, useRef } from "react";
import { NavArrowDown } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

export type SelectProps = {
  children: React.ReactElement[];
  placeholder: string;
  name: string;
  onChange: Function;
};

const Select: React.FC<SelectProps> = ({
  children,
  placeholder = "",
  name,
  onChange,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState("");
  const [label, setLabel] = useState(placeholder);
  const ref = useRef(null);
  const id = useId();

  useOnClickOutside(ref, () => setShowOptions(false));

  const handleOptionSelect = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
    onChange({ value, name });
    setValue(value);
    setLabel(label);
  };

  return (
    <div
      id={id}
      className={`text-white  bg-gradient-to-br from-neutral to-base-100 w-full h-10 max-w-xs rounded-md shadow-md relative cursor-pointer ${
        showOptions ? "outline" : ""
      } hover:outline active:outline focus:outline outline-2 outline-offset-2 outline-primary transition-all duration-75`}
      onClick={() => setShowOptions(!showOptions)}
      ref={ref}
      tabIndex={0}
      {...props}
    >
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.175, easings: [0.5, 1, 0.5, 1] }}
            className="w-full bg-gradient-to-tr from-neutral to-base-100 max-h-36 rounded-md shadow-md absolute top-[calc(100%+8px)] z-20 overflow-hidden"
          >
            <div className="p-2">
              <div className="selectOptions max-h-[128px] overflow-auto">
                {children.map(({ props }, childIndex) => (
                  <button
                    onClick={() =>
                      handleOptionSelect({
                        value: props.value,
                        label: props.children,
                      })
                    }
                    key={childIndex}
                    className="w-full py-1 px-2 rounded-md hover:bg-primary-focus transition-all duration-150 text-left "
                  >
                    {props.children}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-full px-1 select-none">
        {label}
      </div>
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 border-l-2 border-white px-1 select-none`}
      >
        <NavArrowDown
          className={`${
            showOptions ? "rotate-180" : ""
          } transition-all duration-200`}
        />
      </div>
    </div>
  );
};

export default Select;
