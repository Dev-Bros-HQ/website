import { useEffect, useState } from "react";
import { build } from "../../../helpers/guns";
import ImageParallaxScroller from "../../../components/UI/ImageParallaxScroller";
import Spinner from "../../../components/Spinner";
import { useMW2 } from "../../../context/MW2Provider";
import { useFirebase } from "../../../context/FirebaseProvider";

const Page = () => {
  //turning off page until ready to release
  return <></>;

  const { user } = useFirebase();
  const { guns, createBuild } = useMW2();
  const [step, setStep] = useState(0);
  const [filteredGuns, setFilteredGuns] = useState([]);
  const [formattedGuns, setFormattedGuns] = useState([]);
  const [gun, setGun] = useState({});
  const [attachmentValues, setAttachmentValues] = useState({});
  const [hasFiveAttachments, setHasFiveAttachments] = useState(false);
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);

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
      url: "https://devbroshq.com/assets/mw2-guns/mcpr300.webp",
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

  const handleSubmit = () => {
    setLoading(true);
    const build = {
      author_uid: user?.uid,
      gun,
      attachments: attachmentValues,
      handle,
      createdDate: Date.now(),
    };
    const callback = () => {
      setLoading(false);
      window.location.href = "/mw2-builds";
    };
    createBuild(build, callback);
  };

  const isFieldDisabled = (name) => {
    return hasFiveAttachments && !attachmentValues.hasOwnProperty(name)
      ? "disabled"
      : "";
  };

  const checkNumberOfAttachments = () => {
    const keys = Object.keys(attachmentValues);
    const length = keys.length;
    if (length >= 5) {
      setHasFiveAttachments(true);
    } else {
      setHasFiveAttachments(false);
    }
    // console.log(keys);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    let currValue = attachmentValues[name];
    if (currValue) {
      if (value === "") {
        const newValues = {};
        const keys = Object.keys(attachmentValues).filter(
          (key) => key !== name
        );
        keys.forEach((key) => {
          newValues[key] = attachmentValues[key];
        });
        setAttachmentValues(newValues);
        return;
      }
      currValue.value = value;
    } else {
      currValue = {
        value,
        tuningX: 0,
        tuningY: 0,
      };
    }
    setAttachmentValues((curr) => ({ ...curr, [name]: currValue }));
  };

  const handleTuningInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    const attachmentName = name.replace("-x", "").replace("-y", "");
    let currValue = attachmentValues[attachmentName];
    if (currValue) {
      if (name.includes("-x")) {
        currValue.tuningX = value;
      }
      if (name.includes("-y")) {
        currValue.tuningY = value;
      }
    } else {
      if (name.includes("-x")) {
        currValue = { value: "", tuningX: value, tuningY: 0 };
      }
      if (name.includes("-y")) {
        currValue = { value: "", tuningX: 0, tuningY: value };
      }
    }
    setAttachmentValues((curr) => ({ ...curr, [attachmentName]: currValue }));
  };

  useEffect(() => {
    checkNumberOfAttachments();
  }, [attachmentValues, hasFiveAttachments]);

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
      const currentGun = filteredGuns.filter(
        (gun) => gun["gun-name"] === value
      )[0];
      const filtered = filterGunsByClass(value);
      setGun(currentGun);
      setFilteredGuns(filtered);
    }
    setStep((curr) => curr + 1);
  };

  useEffect(() => {
    if (filteredGuns.length > 0) {
      const formatted = filteredGuns.map((gun) => ({
        value: gun["gun-name"],
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
            <div className="flex flex-col md:flex-row items-center md:items-stretch relative w-full justify-center pt-16">
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
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Ammunition:</h1>
              <select
                name="ammunition"
                onChange={handleInput}
                className="select select-info w-64"
                disabled={isFieldDisabled("ammunition")}
              >
                <option value="">Select Ammo Type</option>
                {build.attachments.Ammunition.map((ammo) => (
                  <option key={ammo} value={ammo}>
                    {ammo}
                  </option>
                ))}
              </select>
              <label htmlFor="ammunition-x" className="grow[1]">
                X:
                <input
                  onChange={handleTuningInput}
                  name="ammunition-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("ammunition")}
                />
              </label>
              <label htmlFor="ammunition-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="ammunition-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("ammunition")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Barrel:</h1>
              <select
                name="barrel"
                onChange={handleInput}
                className="select select-info w-64"
                disabled={isFieldDisabled("barrel")}
              >
                <option value="">Select Barrel</option>
                {build.attachments.Barrels.map((barrel) => (
                  <option key={barrel} value={barrel}>
                    {barrel}
                  </option>
                ))}
              </select>
              <label htmlFor="barrel-x" className="grow[1]">
                X:
                <input
                  onChange={handleTuningInput}
                  name="barrel-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("barrel")}
                />
              </label>
              <label htmlFor="barrel-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="barrel-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("barrel")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Muzzle:</h1>
              <select
                name="muzzle"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("muzzle")}
              >
                <option value="">Select Muzzle</option>
                {build.attachments.Muzzles.map((muzzle) => (
                  <option key={muzzle} value={muzzle}>
                    {muzzle}
                  </option>
                ))}
              </select>
              <label htmlFor="muzzle-x" className="grow[1]">
                X:
                <input
                  onChange={handleTuningInput}
                  name="muzzle-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("muzzle")}
                />
              </label>
              <label htmlFor="muzzle-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="muzzle-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("muzzle")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Optic:</h1>
              <select
                name="optic"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("optic")}
              >
                <option value="">Select Optic</option>
                {build.attachments.Optics.map((optics) => (
                  <option key={optics} value={optics}>
                    {optics}
                  </option>
                ))}
              </select>
              <label htmlFor="optic-x" className="grow[1]">
                X:
                <input
                  onChange={handleTuningInput}
                  name="optic-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("optic")}
                />
              </label>
              <label htmlFor="optic-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="optic-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("optic")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Rear Grip:</h1>
              <select
                name="rear-grip"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("rear-grip")}
              >
                <option value="">Select Rear Grip</option>
                {build.attachments["Rear Grips"].map((rg) => (
                  <option key={rg} value={rg}>
                    {rg}
                  </option>
                ))}
              </select>
              <label htmlFor="rear-grip-x" className="grow[1]">
                X:
                <input
                  onChange={handleTuningInput}
                  name="rear-grip-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("rear-grip")}
                />
              </label>
              <label htmlFor="rear-grip-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="rear-grip-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("rear-grip")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Stock:</h1>
              <select
                name="stock"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("stock")}
              >
                <option value="">Select Stock</option>
                {build.attachments.Stocks.map((stock) => (
                  <option key={stock} value={stock}>
                    {stock}
                  </option>
                ))}
              </select>
              <label htmlFor="stock-x" className="grow[1]">
                X:
                <input
                  onChange={handleTuningInput}
                  name="stock-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("stock")}
                />
              </label>
              <label htmlFor="stock-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="stock-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("stock")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Underbarrel:</h1>
              <select
                name="underbarrel"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("underbarrel")}
              >
                <option value="">Select Underbarrel</option>
                {build.attachments.Underbarrels.map((underbarrel) => (
                  <option key={underbarrel} value={underbarrel}>
                    {underbarrel}
                  </option>
                ))}
              </select>
              <label htmlFor="underbarrel-x" className="grow[1]">
                X
                <input
                  onChange={handleTuningInput}
                  name="underbarrel-x"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("underbarrel")}
                />
                :
              </label>
              <label htmlFor="underbarrel-y" className="grow[1]">
                Y:
                <input
                  onChange={handleTuningInput}
                  name="underbarrel-y"
                  type="number"
                  className="input input-bordered input-info max-w-[100px] ml-2"
                  disabled={isFieldDisabled("underbarrel")}
                />
              </label>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Laser:</h1>
              <select
                name="laser"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("laser")}
              >
                <option value="">Select Laser</option>
                {build.attachments.Lasers.map((laser) => (
                  <option key={laser} value={laser}>
                    {laser}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Magazine:</h1>
              <select
                name="magazine"
                onChange={handleInput}
                className="select select-info w-64 max-w-xs"
                disabled={isFieldDisabled("magazine")}
              >
                <option value="">Select Magazine</option>
                {build.attachments.Magazines.map((magazine) => (
                  <option key={magazine} value={magazine}>
                    {magazine}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4 pt-5 max-w-[1280px] mx-auto">
              <h1 className="grow-[2] w-[150px] text-right">Credit</h1>
              <input
                type="text"
                className="input input-bordered input-info max-w-[300px] ml-2"
                placeholder="Enter Twitter Handle"
                onChange={(e) => setHandle(e.target.value)}
              ></input>
            </div>
            <button
              className="btn btn-outline btn-info m-10"
              onClick={handleSubmit}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
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
