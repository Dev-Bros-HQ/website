

const RandomWorkout = ({setWorkout}) => {

    return(
        <div>Random Workout

            <button onClick={() => setWorkout(null)} className="btn" >Back</button>
        </div>
    )
}

export default RandomWorkout