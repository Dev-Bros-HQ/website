import React from "react";
import logo from "../../assets/square-dev-bros-hq-title.webp";
import { usePageContext } from "../../context/usePageContext";
import { popularTools } from "./popularTools";
import Text3D from "../../components/Text3D";

const Page = () => {
  const pageContext = usePageContext();
  return (
    <>
      <section className="body-font w-full bg-[url('/assets/hero-background.svg')] bg-cover bg-bottom pb-[25vh] text-neutral-content lg:-ml-[calc((100vw-1134px)/2)] lg:w-screen">
        <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24 xl:flex-row">
          <div className="mt-5 mb-20">
            <Text3D
              shadowColor="#3A4BF4"
              shadowLength={20}
              gradientAggresiveness={90}
              className="text-white"
            >
              Web tools for the curious
            </Text3D>
          </div>
          <div className="w-full text-left md:px-12 md:text-center">
            <p className="mx-auto mb-8 max-w-md text-3xl sm:text-3xl">
              Explore our random web tools and little projects that can assist
              you in tasks and provide entertainment
            </p>
          </div>
        </div>
      </section>
      <section className="body-font w-full bg-secondary-focus lg:-ml-[calc((100vw-1134px)/2)] lg:w-screen">
        <div className="container mx-auto px-5 py-16">
          <div className="mb-20 flex w-full flex-col text-center">
            <h2 className="title-font mb-4 text-3xl font-medium text-base-300 sm:text-5xl">
              Check out our Tools!
            </h2>
          </div>
          <div className="-m-2 flex flex-wrap">
            {popularTools.map((tool, toolIndex) => {
              const { name, imgUrl, description, url } = tool;
              return (
                <div
                  className="w-full p-2 md:w-1/2 lg:w-1/3"
                  key={`popular-tool-${toolIndex}`}
                >
                  <a href={url}>
                    <div className="relative flex h-[104px] items-center justify-end overflow-hidden rounded-lg bg-base-300 text-neutral shadow-lg">
                      {imgUrl ? (
                        <img
                          alt="team"
                          className="absolute left-0 top-0 mr-4 h-[104px] w-[104px]"
                          src={imgUrl}
                        />
                      ) : (
                        <div className="absolute left-0 top-0 flex h-full w-[104px] items-center justify-center pr-4 text-[30px]">
                          {pageContext?.popularTools?.[toolIndex]?.emoji}
                        </div>
                      )}
                      <div className="z-20 ml-2 h-full w-[calc(100%-90px)] bg-base-300 p-4 text-base-content shadow-[-5px_0px_10px_8px_rgb(243,244,246)] shadow-base-300">
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
