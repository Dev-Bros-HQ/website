import mw2Image from "../../assets/mw2-2022-logo.webp";
import { useMW2 } from "../../context/MW2Provider";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Contributors from "../../components/Contributors";
import "../../components/mw2/viewAttachments.css";
import GunBuild from "../../components/mw2/gunBuild";

const Page = () => {
  //turning off page until ready to release 
  
  // return<></>

  const { builds, getBuilds } = useMW2();
  useEffectOnce(getBuilds);


  return (
    <>
      {/* <h1 className="mt-4 text-4xl font-bold text-accent">
        This page is under construction...
      </h1> */}
      <section className="body-font mt-[-72px] w-full ">
        <div
          className="hero h-[60vh] bg-cover"
          style={{ backgroundImage: `url(${mw2Image})` }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-6xl font-bold">MW2 Gun Builds</h1>
              <p className="mb-5">By the community, for the community</p>
              <a href="/mw2-builds/create" className="btn-secondary btn">
                Make build
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-2 py-12">
          {builds.map((build, buildIndex) => {
            return (
              <GunBuild build={build} key={buildIndex}/>
            );
          })}
        </div>
      </section>
      <Contributors projectName="mw2-builds" />
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "MW2 Gun Builds",
  "og:description":
    "We build tools for you to help us become better developers.View, rate, and create your favorite gun builds!",
};
