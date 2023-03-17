import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RandomizedWorkout = ({
  legWorkouts,
  armWorkouts,
  coreWorkouts,
  intensity,
}) => {
  const workouts = [legWorkouts, armWorkouts, coreWorkouts];

  let numberOfWorkouts = null;
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [time, setTime] = useState(0);
  let workout1 = {};
  let workout2 = {};
  let workout3 = {};
  const [toBeDisplayed, setToBeDisplayed] = useState([]);
  const randomizeWorkout = [
    {
      num1: 0,
      num2: 2,
    },
    {
      num1: 1,
      num2: 0,
    },
    {
      num1: 2,
      num2: 1,
    },
  ];

  const generateWorkout = (intensity) => {
    let targetWorkout = workouts[Math.floor(Math.random() * 3)];

    if (intensity === "e") {
      numberOfWorkouts = 2;
      setSets(2);
      setReps(5);
      setTime(15);

      let randomizer = randomizeWorkout[Math.floor(Math.random() * 3)];

      workout1 = targetWorkout[randomizer.num1];
      workout2 = targetWorkout[randomizer.num2];

      let workouts = [];

      workouts.push(workout1);
      workouts.push(workout2);

      setToBeDisplayed(workouts);
    }

    if (intensity === "m") {
      numberOfWorkouts = 2;
      setSets(2);
      setReps(10);
      setTime(15);

      let randomizer = randomizeWorkout[Math.floor(Math.random() * 3)];

      workout1 = targetWorkout[randomizer.num1];
      workout2 = targetWorkout[randomizer.num2];

      let workouts = [];

      workouts.push(workout1);
      workouts.push(workout2);

      setToBeDisplayed(workouts);
    }

    if (intensity === "h") {
      numberOfWorkouts = 3;
      setSets(2);
      setReps(10);
      setTime(20);

      workout1 = targetWorkout[0];
      workout2 = targetWorkout[1];
      workout3 = targetWorkout[2];

      let workouts = [];

      workouts.push(workout1);
      workouts.push(workout2);
      workouts.push(workout3);

      setToBeDisplayed(workouts);
    }
    if (intensity === "pain") {
      numberOfWorkouts = 3;
      setSets(3);
      setReps(10);
      setTime(25);

      workout1 = targetWorkout[0];
      workout2 = targetWorkout[1];
      workout3 = targetWorkout[2];

      let workouts = [];

      workouts.push(workout1);
      workouts.push(workout2);
      workouts.push(workout3);

      setToBeDisplayed(workouts);
    }
  };

  useEffect(() => {
    generateWorkout(intensity);
  }, [intensity]);

  return (
    <>
      {toBeDisplayed.map((workout) => {
        return (
          <AnimatePresence>
            <motion.div
              key={workout.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className=" m-4 flex rounded-2xl border-8 border-primary bg-secondary p-6 ">
                <section>
                  <img src={workout.img} />
                </section>
                <section className=" m-4 flex flex-col justify-evenly">
                  <h1 className=" text-4xl font-bold text-black ">
                    {workout.name}
                  </h1>
                  {workout.name === "Flutter Kicks" ||
                  workout.name === "Plank" ? (
                    <>
                      <p className="text-2xl text-black">
                        Time - {time} seconds
                      </p>
                    </>
                  ) : (
                    <p className="text-2xl text-black">Reps - {reps}</p>
                  )}
                  <p className="text-2xl text-black">Sets - {sets}</p>
                </section>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </>
  );
};

export default RandomizedWorkout;
