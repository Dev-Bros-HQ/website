import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { createDocument } from "../../context/firebaseActions";
import { useMW2 } from "../../context/MW2Provider";
import Spinner from "../Spinner";
import DevBrosModal from "../UI/Modal/Modal";

const AddAttachment = () => {
  const buttonRef = useRef();
  const [id, setId] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentType, setAttachmentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { getUpdatedAttachments } = useMW2();
  const attachmentTypes = [
    "Muzzle",
    "Barrel",
    "Underbarrel",
    "Laser",
    "Optic",
    "Stock",
    "Comb",
    "Rear Grip",
    "Bolt",
    "Guard",
    "Magazine",
    "Ammunition",
  ];

  const handleInputChange = (e, callback) => {
    const { value } = e.target;
    callback(value);
  };

  const addAttachment = async () => {
    setLoading(true);
    const data = {
      id,
      "attachment-name": attachmentName,
      "attachment-type": attachmentType.toLowerCase(),
    };
    const res = await createDocument(
      `mw2-${attachmentType.toLowerCase()}`,
      data,
      id
    );
    if (res.success) {
      getUpdatedAttachments();
      toast.custom(
        <div className="alert alert-success shadow-lg max-w-[400px]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Successfully Added Attachment</span>
          </div>
        </div>
      );
      setTimeout(() => {
        buttonRef.current.click();
      }, 1500);
    }
    setLoading(false);
  };

  return (
    <>
      <br />
      <button
        ref={buttonRef}
        className="btn btn-secondary"
        onClick={() => setShowModal(!showModal)}
      >
        Add Attachment
      </button>
      <DevBrosModal open={showModal} onClose={() => setShowModal(false)}>
        <div className="card w-full bg-primary-focus shadow-xl">
          <div className="card-body">
            <p className="text-2xl font-bold text-primary-content">Add Gun</p>
            <div className="form-control w-full">
              <div className="w-full flex flex-row items-end justify-between gap-1">
                <div className="w-2/12">
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
                <div className="w-5/12">
                  <p className="text-primary-content uppercase text-lg font-bold grow-0">
                    Attachment Name
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full"
                    onChange={(e) => handleInputChange(e, setAttachmentName)}
                  />
                </div>
                <div className="w-5/12">
                  <p className="text-primary-content uppercase text-lg font-bold grow-0">
                    Attachment Type
                  </p>
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) => handleInputChange(e, setAttachmentType)}
                  >
                    <option value=""></option>
                    {attachmentTypes.map((attachment, attachmentIndex) => (
                      <option
                        key={`attachment-type-${attachmentIndex}`}
                        value={attachment}
                      >
                        {attachment}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-xs sm:btn-sm md:btn-md bg-secondary-focus text-secondary-content border-none hover:bg-secondary-content hover:text-secondary mt-2 max-w-[175px]"
                onClick={() => addAttachment()}
              >
                {loading ? <Spinner /> : "Add Attachment"}
              </button>
            </div>
          </div>
        </div>
      </DevBrosModal>
    </>
  );
};

export default AddAttachment;
