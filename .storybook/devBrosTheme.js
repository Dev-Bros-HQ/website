import { create } from "@storybook/theming";
import logo from "../assets/circle-dev-bros-hq-sm.webp";

export default create({
  base: "dark",

  colorPrimary: "#D927AA",
  colorSecondary: "#661AE6",

  // UI
  appBg: "#191D24",
  appContentBg: "#20252E",
  appBorderColor: "#111318",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#A6ADBB",
  textInverseColor: "#111318",

  // Toolbar default and active colors
  barTextColor: "#20252E",
  barSelectedColor: "#D927AA",
  barBg: "#661AE6",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,

  brandTitle: "Dev Bros HQ storybook",
  brandUrl: "https://www.devbroshq.com",
  brandImage: logo,
  brandTarget: "_self",
});
