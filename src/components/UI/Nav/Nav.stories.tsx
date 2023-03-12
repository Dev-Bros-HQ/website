import { ComponentStory, ComponentMeta } from "@storybook/react";
// @ts-ignore
import { FirebaseProvider } from "../../../context/FirebaseProvider";
import N from ".";

export default {
  title: "Components/Nav",
  component: N,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {},
  args: {},
} as ComponentMeta<typeof N>;

export const Nav: ComponentStory<typeof N> = () => {
  return (
    <FirebaseProvider>
      <N />
    </FirebaseProvider>
  );
};

Nav.args = {};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
