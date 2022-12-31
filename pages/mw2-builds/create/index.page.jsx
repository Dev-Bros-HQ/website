import { useEffect, useState } from "react";
import { useFirebase } from "../../../context/firebase";
import ImageParallaxScroller from "../../../components/UI/ImageParallaxScroller";

const Page = () => {
  const { guns } = useFirebase();
  const [step, setStep] = useState(0);
  const [filteredGuns, setFilteredGuns] = useState([]);
  const [formattedGuns, setFormattedGuns] = useState([]);
  const [gun, setGun] = useState({});

  const images = [
    {
      value: "Assault Rifle",
      label: "Assault Rifle",
      url: "https://devbroshq.com/assets/mw2-guns/m4.webp",
    },
    {
      value: "Battle Rifle",
      label: "Battle Rifle",
      url: "https://devbroshq.com/assets/mw2-guns/lachmann556.webp",
    },
    {
      value: "SMG",
      label: "SMG",
      url: "https://devbroshq.com/assets/mw2-guns/vel46.webp",
    },
    {
      value: "Shotgun",
      label: "Shotgun",
      url: "https://devbroshq.com/assets/mw2-guns/lockwood300.webp",
    },
    {
      value: "LMG",
      label: "LMG",
      url: "https://devbroshq.com/assets/mw2-guns/sakinmg38.webp",
    },
    {
      value: "Marksman Rifle",
      label: "Marksman Rifle",
      url: "https://devbroshq.com/assets/mw2-guns/ebr14.webp",
    },
    {
      value: "Sniper",
      label: "Sniper",
      url: "https://devbroshq.com/assets/mw2-guns/mcpr300webp",
    },
    {
      value: "Handgun",
      label: "Handgun",
      url: "https://devbroshq.com/assets/mw2-guns/p890.webp",
    },
  ];

  const resetBuild = () => {
    setStep(0);
    setFilteredGuns([]);
    setFormattedGuns([]);
    setGun({});
  };

  const filterGunsByClass = (classType) => {
    const gunsOfClass = Object.keys(guns)
      .map((key) => guns[key])
      .filter((gun) => gun.class === classType);
    return gunsOfClass;
  };

  const imageSelect = (value) => {
    if (step === 0) {
      const filtered = filterGunsByClass(value);
      setFilteredGuns(filtered);
    }
    if (step === 1) {
      const filtered = filterGunsByClass(value);
      setGun(value);
      setFilteredGuns(filtered);
    }
    setStep((curr) => curr + 1);
  };

  useEffect(() => {
    if (filteredGuns.length > 0) {
      const formatted = filteredGuns.map((gun) => ({
        value: gun,
        label: gun["gun-name"],
        url: gun.imgURL,
      }));

      setFormattedGuns(formatted);
    }
  }, [filteredGuns]);

  return (
    <>
      <section className="flex flex-col items-center">
        {step === 0 && (
          <ImageParallaxScroller
            images={images}
            onImageSelect={imageSelect}
            title="Select Class"
          />
        )}
        {step === 1 && (
          <ImageParallaxScroller
            images={formattedGuns}
            onImageSelect={imageSelect}
            title="Select Gun"
          />
        )}
        {step > 1 && (
          <>
            <br />
            <br />
            <br />
            <div className="flex flex-col md:flex-row items-center relative w-full justify-center pt-16">
              <button
                onClick={resetBuild}
                className="btn btn-accent absolute left-4 top-0"
              >
                ← Choose a Different Gun
              </button>
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                  <img
                    src={gun.imgURL}
                    alt={gun["gun-name"]}
                    className="scale-125"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-[rgba(255,255,255,1)] uppercase text-6xl font-bold text-center">
                    {gun["gun-name"]}
                  </h2>
                  <div className="badge badge-lg badge-primary">
                    Class: {gun.class}
                  </div>
                  <div className="badge badge-lg badge-secondary">
                    Ammo: {gun.ammunition}
                  </div>
                </div>
              </div>
              <div className="card w-96 bg-primary text-primary-content ml-0 md:ml-6 mt-6 md:mt-0">
                <div className="card-body">
                  <h2 className="card-title">Next step:</h2>
                  <p>Choose up to 5 attachemnts.</p>
                </div>
              </div>
            </div>

            {/* Add Form here for all of the attachments and such */}
          </>
        )}
      </section>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "Create MW2 Gun Build",
  "og:description": "Select the gun and up to 5 attachments for this build.",
};
