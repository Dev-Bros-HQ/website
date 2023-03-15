import React from 'react'

const ConfigureWorkout = ({setWorkout}) => {
  return (
    <div>ConfigureWorkout
        <button onClick={() => setWorkout(null)} className="btn" >Back</button>
    </div>
  )
}

export default ConfigureWorkout