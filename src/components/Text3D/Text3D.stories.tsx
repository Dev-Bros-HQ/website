import { ComponentStory, ComponentMeta } from "@storybook/react";
import T from ".";

export default {
  title: "Typography/Text3D",
  component: T,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    shadowLength: {
      control: "number",
    },
    className: {
      control: "string",
    },
  },
  args: {
    className: "",
  },
} as ComponentMeta<typeof T>;

export const Text3D: ComponentStory<typeof T> = ({
  children,
  shadowColor,
  shadowLength,
  gradientAggresiveness,
}) => {
  return (
    <T
      shadowLength={shadowLength}
      gradientAggresiveness={gradientAggresiveness}
      shadowColor={shadowColor}
      className="text-white"
    >
      {children}
    </T>
  );
};

Text3D.parameters = {
  layout: "centered",
};

Text3D.args = {
  shadowLength: 50,
  gradientAggresiveness: 50,
  shadowColor: "#5114b9",
  children: "Testing",
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
