import mw2Image from "../../assets/mw2-2022-logo.webp";
import { format } from "date-fns";
import { useMW2 } from "../../context/MW2Provider";

const Page = () => {
  // const { builds } = useMW2();
  // console.log({ builds });
  const builds = [
    {
      createdDate: 1672853539723,
      attachments: {
        barrel: {
          tuningX: "1",
          tuningY: "1",
          value: "11 Bryson Special",
        },
        "rear-grip": {
          value: "XTEN Grip",
          tuningX: "1",
          tuningY: "1",
        },
        muzzle: {
          value: "Echoline GS-X",
          tuningY: "1",
          tuningX: "1",
        },
        ammunition: {
          tuningY: "1",
          tuningX: "1",
          value: "6.5mm Overpressured +P",
        },
        optic: {
          tuningY: "1",
          value: "SZ SRO-7",
          tuningX: "1",
        },
      },
      gun: {
        class: "Assault Rifle",
        imgURL: "https://devbroshq.com/assets/mw2-guns/m4.webp",
        id: "1",
        "gun-name": "M4",
        ammunition: "5.56",
      },
      id: "build-944393b4-3f25-c7c7-96ab-49ddf2bf609e",
      handle: "itsWVRP",
    },
    {
      attachments: {
        optic: {
          value: "Cronen Zero-P Optic",
          tuningY: 0,
          tuningX: 0,
        },
        "rear-grip": {
          tuningY: 0,
          value: "",
          tuningX: "1",
        },
        barrel: {
          value: "10.6 Lachstrike Barrel",
          tuningX: "1",
          tuningY: 0,
        },
      },
      gun: {
        imgURL: "https://devbroshq.com/assets/mw2-guns/m4.webp",
        ammunition: "5.56",
        class: "Assault Rifle",
        id: "1",
        "gun-name": "M4",
      },
      createdDate: 1672854136564,
      id: "build-a0ce0e08-fbb9-24d0-442c-20a7c0fe3b0d",
      handle: "sfagf",
    },
    {
      gun: {
        id: "18",
        ammunition: "5.7",
        class: "SMG",
        imgURL: "https://devbroshq.com/assets/mw2-guns/fsshurricane.webp",
        "gun-name": "FSS Hurricane",
      },
      attachments: {
        "rear-grip": {
          tuningX: 0,
          tuningY: 0,
          value: "Bruen Lynx Grip",
        },
        optic: {
          tuningY: 0,
          value: "Corvus SOL-76",
          tuningX: 0,
        },
        barrel: {
          tuningX: "3",
          value: "12.5 Carbon Barrel",
          tuningY: 0,
        },
        muzzle: {
          tuningY: "2",
          tuningX: "-2",
          value: "RF Crown 50",
        },
        ammunition: {
          tuningY: "-4",
          tuningX: "2",
          value: "6.5mm Overpressured +P",
        },
      },
      id: "build-a580f55a-f60b-feb4-624a-89d9ed4b6afa",
      handle: "@itsWVRP",
      createdDate: 1672871362179,
    },
    {
      id: "build-d733dc74-a2e9-1e25-46cc-4766be3acdd1",
      handle: "dszASVG",
      createdDate: 1672854023860,
      gun: {
        ammunition: "5.56",
        imgURL: "https://devbroshq.com/assets/mw2-guns/m4.webp",
        id: "1",
        "gun-name": "M4",
        class: "Assault Rifle",
      },
      attachments: {
        muzzle: {
          tuningY: "1",
          value: "Corvus Slash Gen. 2",
          tuningX: "1",
        },
        "rear-grip": {
          tuningX: "1",
          tuningY: "1",
          value: "Sakin ZX Grip",
        },
        ammunition: {
          tuningX: "1",
          value: ".458 Frangible",
          tuningY: "1",
        },
        barrel: {
          tuningY: "1",
          tuningX: "1",
          value: "11.5 T-H4 Barrel",
        },
        optic: {
          tuningY: "1",
          tuningX: "1",
          value: "Cronen Zero-P Optic",
        },
      },
    },
  ];
  return (
    <>
      <section className="body-font w-full lg:w-screen lg:-ml-[calc((100vw-1007px)/2)] mt-[-72px]">
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
      </section>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "MW2 Gun Builds",
  "og:description":
    "We build tools for you to help us become better developers.View, rate, and create your favorite gun builds!",
};
