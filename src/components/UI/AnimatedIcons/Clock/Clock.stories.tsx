import { ComponentStory, ComponentMeta } from "@storybook/react";
import C from ".";

export default {
  title: "AnimatedIcons/Clock",
  component: C,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    started: {
      control: "boolean",
    },
    speed: {
      control: "number",
    },
    className: {
      control: "string",
    },
  },
  args: {
    started: false,
    speed: 2,
    className: "",
  },
} as ComponentMeta<typeof C>;

export const Clock: ComponentStory<typeof C> = ({ started, speed }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <C className="h-24 w-24 text-primary" speed={speed} started={started} />
      <p>Started: {started ? "started" : "stopped"}</p>
    </div>
  );
};

Clock.args = {};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
