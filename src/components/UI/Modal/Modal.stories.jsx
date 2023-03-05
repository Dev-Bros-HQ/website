import React, { useEffect, useState } from "react";
import M from "./Modal";

export default {
  title: "Components/Modal",
  component: M,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
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

export const Modal = ({ open = false }) => {
  const [o, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);
  return (
    <>
      <button className="btn" onClick={() => setOpen(!o)}>
        Open Modal
      </button>
      <M open={o} onClose={() => setOpen(false)}>
        <div className="bg-primary w-full max-w-lg h-full max-h-[150px] card card-body">
          Test Modal
        </div>
      </M>
    </>
  );
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
