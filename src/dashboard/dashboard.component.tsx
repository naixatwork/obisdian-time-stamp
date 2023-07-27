import * as React from 'react'
import {useState} from "react";

export const DashboardComponent = () => {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <h1>
                {counter}
            </h1>
            <button onClick={() => {
                setCounter(prev => prev+1)
            }}>
                lol
            </button>
        </>
    )
}
