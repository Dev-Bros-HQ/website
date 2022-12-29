import { useState } from "react";
import { foodCategories, foodMeasurments } from "../../helpers/inYourFridge";
import DevBrosModal from "../UI/Modal";

const AddFridgeItemForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measurement, setMeasurement] = useState("");

  const handleSubmit = () => {
    console.log({ category, name, quantity, measurement });
  };

  const handleUpdateQuantity = (amount) => {
    setQuantity((currQuantity) => {
      if (currQuantity + amount < 0) {
        return 0;
      }

      return currQuantity + amount;
    });
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={() => setIsOpen(true)}>
        Add Food Item
      </button>
      <DevBrosModal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-3xl">Add Food Item</h2>
        <div className="w-full max-w-xs">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Food Item Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.keys(foodCategories).map((key) => {
                const category = foodCategories[key];
                return (
                  <option key={category.value} value={category.value}>
                    {category.icon}
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Food Item Name</span>
            </label>
            <input
              type="text"
              placeholder="Food Item Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex w-full">
            <div className="form-control w-1/2 max-w-xs">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Quantity"
                min="0"
                step=".05"
                className="input input-bordered w-full"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-control w-1/2 ml-2">
              <label className="label">
                <span className="label-text">Measurement</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
              >
                {Object.keys(foodMeasurments).map((key) => {
                  const measurement = foodMeasurments[key];
                  return (
                    <option key={measurement.value} value={measurement.value}>
                      {measurement.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex w-full gap-2 mt-2">
            <button
              className="btn btn-sm btn-primary w-[auto] px-2"
              onClick={() => handleUpdateQuantity(-5)}
            >
              - 5
            </button>
            <button
              className="btn btn-sm btn-primary w-[auto] px-2"
              onClick={() => handleUpdateQuantity(-1)}
            >
              - 1
            </button>
            <button
              className="btn btn-sm btn-primary w-[auto] px-2"
              onClick={() => handleUpdateQuantity(1)}
            >
              + 1
            </button>
            <button
              className="btn btn-sm btn-primary w-[auto] px-2"
              onClick={() => handleUpdateQuantity(5)}
            >
              + 5
            </button>
          </div>
          <br />
          <button onClick={handleSubmit} className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </DevBrosModal>
    </>
  );
};

export default AddFridgeItemForm;
