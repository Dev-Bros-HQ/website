import { ChangeEventHandler, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import C from ".";

export default {
  title: "UI/Checkbox",
  component: C,
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
    checked: {
      control: { type: "boolean" },
    },
  },
  args: {
    label: "What is your fav fast food restaurant?",
    id: "fast-food-input",
    checked: false,
  },
} as ComponentMeta<typeof C>;

export const Checkbox: ComponentStory<typeof C> = ({ label, id, ...props }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <C value={checked} onChange={setChecked} label={label} id={id} />
    </div>
  );
};

Checkbox.args = {};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
