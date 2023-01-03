import React from "react";
import logo from "../../assets/square-dev-bros-hq-title.webp";
import mw2Logo from "../../assets/mw2-2022-logo.webp";
import { usePageContext } from "../../renderer/usePageContext";
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

const Page = () => {
  const pageContext = usePageContext();
  return (
    <>
      <section className="text-neutral-content body-font w-full lg:w-screen lg:-ml-[calc((100vw-1007px)/2)] bg-[url('/assets/hero-background.svg')] bg-cover bg-bottom pb-[25vh]">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col md:flex-row">
          <img
            className="w-1/2 max-w-[300px] mb-10 object-cover object-center rounded-lg"
            alt="dev bros hq logo"
            src={logo}
            width="300"
            height="300"
          />
          <div className="md:text-center lg:w-1/2 w-full text-left md:px-12">
            <p className="mb-8 sm:text-4xl text-3xl">
              Tools for internet users, built by a team that's{" "}
              <span className="text-accent underline">always learning</span>
            </p>
          </div>
        </div>
      </section>
      <section className="body-font w-full lg:w-screen lg:-ml-[calc((100vw-1007px)/2)] bg-secondary-focus">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="sm:text-5xl text-3xl font-medium title-font mb-4 text-base-300">
              Check out our Popular Tools!
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
                  <a href={url}>
                    <div className="relative h-[104px] flex items-center justify-end rounded-lg overflow-hidden text-neutral shadow-lg bg-base-300">
                      {imgUrl ? (
                        <img
                          alt="team"
                          className="left-0 top-0 h-[104px] w-[104px] absolute mr-4"
                          src={imgUrl}
                        />
                      ) : (
                        <div className="left-0 top-0 w-[104px] h-full absolute flex justify-center items-center text-[30px] pr-4">
                          {pageContext?.popularTools?.[toolIndex]?.emoji}
                        </div>
                      )}
                      <div className="h-full w-[calc(100%-90px)] shadow-[-5px_0px_10px_8px_rgb(243,244,246)] shadow-base-300 ml-2 p-4 z-20 bg-base-300 text-base-content">
                        <p className="title-font font-medium text-primary">
                          {name}
                        </p>
                        <p className="text-xs xs:text-base">
                          {description
                            ? description
                            : pageContext?.popularTools?.[toolIndex]?.message}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export { Page };
