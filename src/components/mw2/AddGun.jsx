import { useState } from "react";
import { useFirebase } from "../../context/firebase";
import { build } from "../../helpers/guns";
import Spinner from "../Spinner";

const AddGun = () => {
  const [id, setId] = useState("");
  const [gunName, setGunName] = useState("");
  const [gunClass, setGunClass] = useState("");
  const [ammunition, setAmmunition] = useState("");
  const [loading, setLoading] = useState(false);
  const { createDocument } = useFirebase();
  const gunBuild = build;

  const handleInputChange = (e, callback) => {
    const { value } = e.target;
    callback(value);
  };

  const addGun = async () => {
    setLoading(true);
    const data = {
      id,
      "gun-name": gunName,
      class: gunClass,
      ammunition,
    };
    const res = await createDocument("mw2-guns", data, id);
    console.log(res);
    setLoading(false);
  };

  return (
    <>
      <br />
      <div className="card w-full bg-primary-focus shadow-xl">
        <div className="card-body">
          <p className="text-2xl font-bold text-primary-content">Add Gun</p>
          <div className="form-control w-full">
            <div className="w-full flex flex-row items-end justify-between gap-1">
              <div className="w-1/12">
                <p className="text-primary-content uppercase text-lg font-bold grow-0">
                  ID
                </p>
                <input
                  type="number"
                  min="0"
                  placeholder=""
                  className="input input-bordered w-full shrink-0"
                  onChange={(e) => handleInputChange(e, setId)}
                />
              </div>
              <div className="w-4/12">
                <p className="text-primary-content uppercase text-lg font-bold grow-0">
                  Gun Name
                </p>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) => handleInputChange(e, setGunName)}
                />
              </div>
              <div className="w-4/12">
                <p className="text-primary-content uppercase text-lg font-bold grow-0">
                  Class
                </p>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => handleInputChange(e, setGunClass)}
                >
                  <option value=""></option>
                  {gunBuild.class.map((gunClass, gunClassIndex) => (
                    <option key={`gun-class-${gunClassIndex}`} value={gunClass}>
                      {gunClass}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-3/12">
                <p className="text-primary-content uppercase text-lg font-bold grow-0">
                  Ammunition
                </p>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) => handleInputChange(e, setAmmunition)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-xs sm:btn-sm md:btn-md bg-secondary-focus text-secondary-content border-none hover:bg-secondary-content hover:text-secondary mt-2 max-w-[150px]"
              onClick={() => addGun()}
            >
              {loading ? <Spinner /> : "Add Gun"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGun;
