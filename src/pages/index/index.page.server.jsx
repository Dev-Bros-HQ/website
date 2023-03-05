import { getRandomInt } from "../../helpers";
import { popularTools } from "./popularTools";

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
