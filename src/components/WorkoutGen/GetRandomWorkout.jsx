import { useState } from "react";
import RandomizedWorkout from "./RandomizedWorkout";

const GetRandomWorkout = ({ setWorkout }) => {

  const [intensity, setIntensity] = useState(null);

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
      img: "https://cdn-icons-png.flaticon.com/128/1226/1226305.png"
    }
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
    <div className="m-4 flex flex-col items-center">

      <select onChange={(e) => setIntensity(e.target.value)} className=" select-bordered select-primary select w-full max-w-xs m-2">

        <option disabled selected>Choose intensity of workout</option>
        <option value="e">Easy </option>
        <option value="m"> Moderate </option>
        <option value="h"> Hard </option>
        <option value="pain"> Get hit with the pain train </option>

      </select>

      <RandomizedWorkout
        legWorkouts={legWorkouts}
        armWorkouts={armWorkouts}
        coreWorkouts={coreWorkouts}
        intensity={intensity}
      />

      <button onClick={() => setWorkout(null)} className="btn-accent btn m-4">
        Back
      </button>
    </div>
  );
};

export default GetRandomWorkout;
