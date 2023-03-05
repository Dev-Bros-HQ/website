import mw2Image from "../../assets/mw2-2022-logo.webp";
import { format } from "date-fns";
import { useMW2 } from "../../context/MW2Provider";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Contributors from "../../components/Contributors";

const Page = () => {
  //turning off page until ready to release

  const { builds, getBuilds } = useMW2();
  useEffectOnce(getBuilds);

  return (
    <>
      <h1 className="text-4xl text-accent font-bold mt-4">
        This page is under construction...
      </h1>
      {/* <section className="body-font w-full lg:w-screen lg:-ml-[calc((100vw-1007px)/2)] mt-[-72px]">
        <div
          className="hero h-[60vh] bg-cover"
          style={{ backgroundImage: `url(${mw2Image})` }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-6xl font-bold">MW2 Gun Builds</h1>
              <p className="mb-5">By the community, for the community</p>

              <a href="/mw2-builds/create" className="btn btn-secondary">
                Make build
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center max-w-[1280px] mx-auto gap-2 py-12">
          {builds.map((build, buildIndex) => {
            const { id, gun, createdDate, handle } = build;
            // console.log({ build });
            return (
              <div
                key={id}
                className="card w-96 bg-base-content text-base-200 shadow-xl"
              >
                <figure className="w-full h-full max-h-[216px]">
                  <img src={gun.imgURL} alt={gun["gun-name"]} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {gun["gun-name"]}
                    <div className="badge badge-primary">{gun.class}</div>
                  </h2>
                  {handle ? (
                    <a
                      href={`https://twitter.com/${handle}`}
                      className="flex link link-neutral"
                    >
                      By: {handle}
                      <svg
                        width="24px"
                        height="24px"
                        strokeWidth="1.98"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#000000"
                        className="ml-3"
                      >
                        <path
                          d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"
                          stroke="#000000"
                          strokeWidth="1.98"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                  ) : null}
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-between items-end">
                    <div className="badge badge-lg">
                      Created {format(new Date(createdDate), "P")}
                    </div>
                    <a className="btn btn-primary" href={`/mw2-builds/${id}`}>
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section> */}
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
