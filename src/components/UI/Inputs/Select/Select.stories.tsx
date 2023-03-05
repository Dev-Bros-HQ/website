import React, { useEffect, useState } from "react";
import S from ".";

export default {
  title: "Components/Select",
  component: S,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "State of the modal (`true`: modal is open, `false`: modal is closed)",
    },
  },
  args: {
    open: false,
  },
};

export const Select = () => {
  const [values, setValues] = useState({});
  const handleChange = ({ value, name }: { value: string; name: string }) => {
    setValues((currVals) => ({ ...currVals, [name]: value }));
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <S
        onChange={handleChange}
        name="fav-fast-food"
        placeholder="Select your fav fast food restaurant"
      >
        <option value="taco-bell">Taco Bell</option>
        <option value="mcdonalds">McDonalds</option>
        <option value="wendys">Wendy's</option>
        <option value="del-taco">Del Taco</option>
        <option value="taco-bell">Taco Bell</option>
        <option value="mcdonalds">McDonalds</option>
        <option value="wendys">Wendy's</option>
        <option value="del-taco">Del Taco</option>
        <option value="taco-bell">Taco Bell</option>
        <option value="mcdonalds">McDonalds</option>
        <option value="wendys">Wendy's</option>
        <option value="del-taco">Del Taco</option>
      </S>
      <br />
      <S
        onChange={handleChange}
        name="fav-color"
        placeholder="What is your favorite color?"
      >
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
      </S>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => window.alert(JSON.stringify(values))}
      >
        Submit
      </button>
    </div>
  );
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
