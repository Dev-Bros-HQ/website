import { ChangeEventHandler, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import I from ".";

export default {
  title: "UI/Input",
  component: I,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    label: {
      control: { type: "text" },
    },
    id: {
      control: { type: "text" },
    },
    name: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "text" },
    },
  },
  args: {
    label: "What is your fav fast food restaurant?",
    id: "fast-food-input",
    name: "fav-fast-food",
    required: false,
    disabled: false,
    error: "",
  },
} as ComponentMeta<typeof I>;

export const Input: ComponentStory<typeof I> = ({
  label,
  id,
  name,
  required,
  disabled,
  error,
  ...props
}) => {
  const [value, setValue] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value);
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <I
        onChange={handleChange}
        value={value}
        label={label}
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        error={error}
      />
    </div>
  );
};

Input.args = {};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
