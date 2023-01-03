import { getRandomInt } from "../../helpers";
import mw2Logo from "../../assets/mw2-2022-logo.webp";

const popularTools = [
  {
    imgUrl: mw2Logo,
    name: "MW2 Gun Builds",
    description: "Create, Share, and View the best gun builds!",
    url: "/mw2-builds",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
  {
    imgUrl: "",
    name: "Coming Soon",
    description: "",
    url: "/",
  },
];
const buildingToolsEmojis = ["👀", "👷", "🛠️", "🕒", "🚧"];
const buildingToolsMessages = [
  "We are still working on this tool",
  "This tool has a few bugs, but we are working on it",
  "Check back later",
  "This tool is under construction",
  "Almost there...",
];

const getRandomBuildEmoji = () => {
  return buildingToolsEmojis[getRandomInt(0, buildingToolsEmojis.length - 1)];
};

const getRandomBuildMessage = () => {
  return buildingToolsMessages[
    getRandomInt(0, buildingToolsMessages.length - 1)
  ];
};
export { onBeforeRender };

async function onBeforeRender(pageContext) {
  let tools = [];
  for (let i = 0; i < popularTools.length; i += 1) {
    tools.push({
      emoji: getRandomBuildEmoji(),
      message: getRandomBuildMessage(),
    });
  }
  return {
    pageContext: {
      popularTools: tools,
    },
  };
}
