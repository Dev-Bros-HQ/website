import { useState, useEffect } from "react";

const CustomWorkout = ({workouts}) => {

  const [toBeDisplayed, setToBeDisplayed] = useState([])

  useEffect(() => {

    setToBeDisplayed(workouts)

  }, [workouts])

  const handleDelete = (index) => {
    const newToBeDisplayed = [...toBeDisplayed]
    newToBeDisplayed.splice(index, 1)
    workouts.splice(index, 1)
    setToBeDisplayed(newToBeDisplayed)
  }



  return <div className="w-full flex flex-wrap justify-center items-center gap-5">
    {toBeDisplayed.map((workout, i) => (
      <>
      <div className="w-1/3 flex justify-center border-4 bg-accent border-black rounded-lg p-4">
      <img src={workout.img}/>
      <div className="flex flex-col items-center gap-2">
      <h3 className="text-xl text-black">{workout.name}</h3>
      <section className="flex gap-1 justify-center items-center">
      <p className="text-lg text-black">Reps</p>
      <input type="number" className="input input-xs w-1/3"/>
      </section>
      <section className="flex gap-1 justify-center items-center">
      <p className="text-lg text-black">Sets</p>
      <input type="number" className="input input-xs w-1/3"/>
      </section>
      <button className="btn btn-xs" onClick={() => handleDelete(i)}>Delete</button>
      </div>
      </div>
      </>
    ))}
  </div>;
};

export default CustomWorkout;
