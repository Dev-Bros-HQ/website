import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ImageParallaxScroller from "../../../components/UI/ImageParallaxScroller";
import { useFirebase } from "../../../context/firebase";
import { build } from "../../../helpers/guns";

const CreateMW2Build = () => {
  const { guns } = useFirebase();
  const [step, setStep] = useState(0);
  const [filteredGuns, setFilteredGuns] = useState([]);
  const [formattedGuns, setFormattedGuns] = useState([]);
  const [gun, setGun] = useState({});

  const images = [
    {
      value: "Assault Rifle",
      label: "Assault Rifle",
      url: "https://iili.io/HntDUrl.png",
    },
    {
      value: "Battle Rifle",
      label: "Battle Rifle",
      url: "https://iili.io/HntDh7I.png",
    },
    {
      value: "SMG",
      label: "SMG",
      url: "https://iili.io/Hntb0y7.png",
    },
    {
      value: "Shotgun",
      label: "Shotgun",
      url: "https://iili.io/HntDkLG.png",
    },
    {
      value: "LMG",
      label: "LMG",
      url: "https://iili.io/HntbfEv.png",
    },
    {
      value: "Marksman Rifle",
      label: "Marksman Rifle",
      url: "https://iili.io/HntDq57.png",
    },
    {
      value: "Sniper",
      label: "Sniper",
      url: "https://iili.io/HntDDEx.png",
    },
    {
      value: "Handgun",
      label: "Handgun",
      url: "https://iili.io/HnDd6zB.png",
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
      <Helmet>
        <title>Create MW2 Gun Build | Dev Bros HQ</title>
        <meta
          content="Create MW2 Gun Build | Dev Bros HQ"
          property="og:title"
        />
        <meta
          content="Select the gun and up to 5 attachments for this build."
          property="og:description"
        />
        <meta content="https://devbroshq.com/" property="og:url" />
        <meta
          content="https://devbroshq.com/square-dev-bros-hq-title.webp"
          property="og:image"
        />
        <meta content="#3ABFF8" data-react-helmet="true" name="theme-color" />
      </Helmet>
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
                  <p>Choose up to 5 attachments.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Ammunition:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Amno Type</option>
                {build.attachments.Ammunition.map((amno) => (
                  <option value={amno}>{amno}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Barrel:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Barrel</option>
                {build.attachments.Barrels.map((barrel) => (
                  <option value={barrel}>{barrel}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Muzzle:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Muzzle</option>
                {build.attachments.Muzzles.map((muzzle) => (
                  <option value={muzzle}>{muzzle}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Optic:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Optic</option>
                {build.attachments.Optics.map((optics) => (
                  <option value={optics}>{optics}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Rear Grip:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Rear Grip</option>
                {build.attachments["Rear Grips"].map((rg) => (
                  <option value={rg}>{rg}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Stock:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Stock</option>
                {build.attachments.Stocks.map((stock) => (
                  <option value={stock}>{stock}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Underbarrel:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Underbarrel</option>
                {build.attachments.Underbarrels.map((underbarrel) => (
                  <option value={underbarrel}>{underbarrel}</option>
                ))}
              </select>
              <label htmlFor="x">X:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
              <label htmlFor="y">Y:</label>
              <input
                type="number"
                className="input input-bordered input-info w-24 max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Laser:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Laser</option>
                {build.attachments.Lasers.map((laser) => (
                  <option value={laser}>{laser}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-5">
              <h1 className="w-15">Magazine:</h1>
              <select className="select select-info w-64 max-w-xs">
                <option value="">Select Magazine</option>
                {build.attachments.Magazines.map((magazine) => (
                  <option value={magazine}>{magazine}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-outline btn-info m-10">Submit</button>
          </>
        )}
      </section>
    </>
  );
};

export default CreateMW2Build;
