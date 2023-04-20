import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomWorkout from "./CustomWorkout";

const ConfigureWorkout = ({ setWorkout }) => {
  const [target, setTarget] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
    console.log(workouts);
  };

  const legWorkouts = [
    {
      name: "Lunges",
      img: "https://cdn-icons-png.flaticon.com/128/3043/3043175.png",
    },
    {
      name: "Squats",
      img: "https://cdn-icons-png.flaticon.com/128/5151/5151246.png",
    },
    {
      name: "Flutter Kicks",
      img: "https://cdn-icons-png.flaticon.com/128/6315/6315795.png",
    },
  ];

  const armWorkouts = [
    {
      name: "Push Ups",
      img: "https://cdn-icons-png.flaticon.com/128/2548/2548518.png",
    },
    {
      name: "Chair Dips",
      img: "https://cdn-icons-png.flaticon.com/128/5146/5146938.png",
    },
    {
      name: "Decline Push Ups",
      img: "https://cdn-icons-png.flaticon.com/128/1226/1226305.png",
    },
  ];

  const coreWorkouts = [
    {
      name: "Sit Ups",
      img: "https://cdn-icons-png.flaticon.com/128/3048/3048342.png",
    },
    {
      name: "Plank",
      img: "https://cdn-icons-png.flaticon.com/128/4742/4742379.png",
    },
    {
      name: "Flutter Kicks",
      img: "https://cdn-icons-png.flaticon.com/128/6315/6315795.png",
    },
  ];

  return (
    <div className="m-4 flex flex-col items-center overflow-x-hidden">
      <h2 className=" m-2 text-4xl">Choose Target Area</h2>

      <div className="m-4 flex w-full flex-row items-center justify-center gap-10">
        <section
          className={`border-8 bg-secondary ${
            target === "core" ? "border-primary" : "border-black"
          } flex flex-col items-center rounded-2xl p-4 transition duration-200 hover:bg-secondary-focus`}
        >
          <button onClick={() => setTarget("core")}>
            <img
              className=" max-h-32"
              src="https://static.thenounproject.com/png/3606238-200.png"
            />
            <p className="text-2xl text-black">Core</p>
          </button>
        </section>

        <section
          className={`border-8 bg-secondary ${
            target === "arms" ? "border-primary" : "border-black"
          } flex flex-col items-center rounded-2xl p-4 transition duration-200 hover:bg-secondary-focus`}
        >
          <button onClick={() => setTarget("arms")}>
            <img
              className=" max-h-32"
              src="https://cdn-icons-png.flaticon.com/128/4429/4429835.png"
            />
            <p className="text-2xl text-black">Arms</p>
          </button>
        </section>

        <section
          className={`border-8 bg-secondary ${
            target === "legs" ? "border-primary" : "border-black"
          } flex flex-col items-center rounded-2xl p-4 transition duration-200 hover:bg-secondary-focus`}
        >
          <button onClick={() => setTarget("legs")}>
            <img
              className=" max-h-32"
              src="https://cdn-icons-png.flaticon.com/128/6063/6063199.png"
            />
            <p className="text-2xl text-black">Legs</p>
          </button>
        </section>
      </div>

      <h2 className=" m-2 text-4xl">Add Workout</h2>

      <AnimatePresence mode="popLayout">
        {target === "legs" ? (
          <motion.div
            className="flex w-full flex-col items-center overflow-x-hidden"
            key="leg"
            initial={{ x: -800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="m-4 flex w-full justify-center gap-10">
              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-2 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Lunges",
                      img: "https://cdn-icons-png.flaticon.com/128/3043/3043175.png",
                    })
                  }
                >
                  <img src={legWorkouts[0].img} />
                  <p className="text-xl text-black">{legWorkouts[0].name}</p>
                </button>
              </section>

              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-2 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Squats",
                      img: "https://cdn-icons-png.flaticon.com/128/5151/5151246.png",
                    })
                  }
                >
                  <img src={legWorkouts[1].img} />
                  <p className="text-xl text-black">{legWorkouts[1].name}</p>
                </button>
              </section>

              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-2 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Flutter Kicks",
                      img: "https://cdn-icons-png.flaticon.com/128/6315/6315795.png",
                    })
                  }
                >
                  <img src={legWorkouts[2].img} />
                  <p className="text-xl text-black">{legWorkouts[2].name}</p>
                </button>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {target === "arms" ? (
          <motion.div
            className="flex w-full flex-col items-center overflow-x-hidden"
            key="leg"
            initial={{ x: -800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="m-4 flex w-full justify-center gap-10">
              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-2 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Push Ups",
                      img: "https://cdn-icons-png.flaticon.com/128/2548/2548518.png",
                    })
                  }
                >
                  <img src={armWorkouts[0].img} />
                  <p className="text-xl text-black">{armWorkouts[0].name}</p>
                </button>
              </section>

              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-2 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Chair Dips",
                      img: "https://cdn-icons-png.flaticon.com/128/5146/5146938.png",
                    })
                  }
                >
                  <img src={armWorkouts[1].img} />
                  <p className="text-xl text-black">{armWorkouts[1].name}</p>
                </button>
              </section>

              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-2 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Decline Push Ups",
                      img: "https://cdn-icons-png.flaticon.com/128/1226/1226305.png",
                    })
                  }
                >
                  <img src={armWorkouts[2].img} />
                  <p className="text-xl text-black">{armWorkouts[2].name}</p>
                </button>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {target === "core" ? (
          <motion.div
            className="flex w-full flex-col items-center overflow-x-hidden"
            key="leg"
            initial={{ x: -800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="m-4 flex w-full justify-center gap-10">
              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-1 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Sit Ups",
                      img: "https://cdn-icons-png.flaticon.com/128/3048/3048342.png",
                    })
                  }
                >
                  <img src={coreWorkouts[0].img} />
                  <p className="text-xl text-black">{coreWorkouts[0].name}</p>
                </button>
              </section>

              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-1 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Plank",
                      img: "https://cdn-icons-png.flaticon.com/128/4742/4742379.png",
                    })
                  }
                >
                  <img src={coreWorkouts[1].img} />
                  <p className="text-xl text-black">{coreWorkouts[1].name}</p>
                </button>
              </section>

              <section className="flex w-1/4 items-center justify-center gap-5 rounded-lg border-4 border-black bg-primary p-1 transition duration-200 hover:bg-primary-focus">
                <button
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() =>
                    addWorkout({
                      name: "Flutter Kicks",
                      img: "https://cdn-icons-png.flaticon.com/128/6315/6315795.png",
                    })
                  }
                >
                  <img src={coreWorkouts[2].img} />
                  <p className="text-xl text-black">{coreWorkouts[2].name}</p>
                </button>
              </section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {workouts.length === 0 ? null : (
        <>
          <h2 className="m-2 text-4xl">Your Workout</h2>
          <CustomWorkout workouts={workouts} />
        </>
      )}

      <button onClick={() => setWorkout(null)} className="btn-accent btn m-4">
        Back
      </button>
    </div>
  );
};

export default ConfigureWorkout;
