import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/square-dev-bros-hq-title.webp";
import mw2Logo from "../assets/mw2-2022-logo.webp";
import { getRandomInt } from "../helpers";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const buildingToolsEmojis = ["👀", "👷", "🛠️", "🕒", "🚧"];
  const buildingToolsMessages = [
    "We are still working on this tool",
    "This tool has a few bugs, but we are working on it",
    "Check back later",
    "This tool is under construction",
    "Almost there...",
  ];
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

  const getRandomBuildEmoji = () => {
    return buildingToolsEmojis[getRandomInt(0, buildingToolsEmojis.length - 1)];
  };

  const getRandomBuildMessage = () => {
    return buildingToolsMessages[
      getRandomInt(0, buildingToolsMessages.length - 1)
    ];
  };

  return (
    <>
      <Helmet>
        <title>Dev Bros HQ</title>
        <meta content="Dev Bros HQ" property="og:title" />
        <meta
          content="We build tools for you to help us become better developers."
          property="og:description"
        />
        <meta content="https://devbroshq.com/" property="og:url" />
        <meta
          content="https://devbroshq.com/square-dev-bros-hq-title.webp"
          property="og:image"
        />
        <meta content="#3ABFF8" data-react-helmet="true" name="theme-color" />
      </Helmet>
      <section className="text-neutral-content body-font w-full lg:w-screen lg:-ml-[calc((100vw-1007px)/2)] bg-[url('/assets/hero-background.svg')] bg-cover bg-bottom pb-[25vh]">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col md:flex-row">
          <img
            className="w-1/2 max-w-[300px] mb-10 object-cover object-center rounded-lg"
            alt="dev bros hq logo"
            src={logo}
          />
          <div className="md:text-center lg:w-1/2 w-full text-left md:px-12">
            <p className="mb-8 sm:text-4xl text-3xl">
              Where we learn to be better developers by{" "}
              <span className="text-accent underline">
                building tools for you.
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="body-font w-full lg:w-screen lg:-ml-[calc((100vw-1007px)/2)] bg-secondary-focus">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="sm:text-5xl text-3xl font-medium title-font mb-4 text-base-300">
              Check out our <span className="text-accent">Popular Tools!</span>
            </h2>
          </div>
          <div className="flex flex-wrap -m-2">
            {popularTools.map((tool, toolIndex) => {
              const { name, imgUrl, description, url } = tool;
              return (
                <div
                  className="p-2 lg:w-1/3 md:w-1/2 w-full"
                  key={`popular-tool-${toolIndex}`}
                >
                  <Link to={url}>
                    <div className="relative h-[104px] flex items-center justify-end rounded-lg overflow-hidden text-neutral shadow-lg bg-base-300">
                      {imgUrl ? (
                        <img
                          alt="team"
                          className="left-0 top-0 h-[104px] absolute pr-4 w-[104px]"
                          src={imgUrl}
                        />
                      ) : (
                        <div className="left-0 top-0 w-[104px] h-full absolute flex justify-center items-center text-[30px] pr-4">
                          {getRandomBuildEmoji()}
                        </div>
                      )}
                      <div className="h-full w-[calc(100%-90px)] shadow-[-5px_0px_10px_8px_rgb(243,244,246)] shadow-base-300 ml-2 p-4 z-20 bg-base-300 text-base-content">
                        <p className="title-font font-medium text-primary">
                          {name}
                        </p>
                        <p className="text-xs xs:text-base">
                          {description ? description : getRandomBuildMessage()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
