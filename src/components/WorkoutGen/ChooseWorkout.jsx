import { useState } from "react"
import ConfigureWorkout from "./ConfigureWorkout"
import RandomWorkout from "./RandomWorkout"

const ChooseWorkout = () => {

    const [workout, setWorkout] = useState(null)


    return(
        <>
       {!workout &&
        <>
        <div className="flex flex-col items-center justify-center m-4">
            <h2 className=" text-4xl m-2 ">Welcome to the workout generator!</h2>
            <p className="m-4">Choose what type of workout you would like below</p>
        </div>
        <div className=" justify-evenly flex mt-24">
        <button onClick={() => {setWorkout('random')}} className="btn btn-primary">Random workout</button>
        <button onClick={() => {setWorkout('configure')}} className="btn btn-secondary">Custom workout</button>
        </div>
        </>
        }
        {
            workout === 'random' && <> <RandomWorkout setWorkout={setWorkout} /> </>
        }
        {
            workout === 'configure' && <> <ConfigureWorkout setWorkout={setWorkout}/> </>
        }
        </>
    )
}

export default ChooseWorkout