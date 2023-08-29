import React from "react";
import { useEffect } from "react";

export default function ComputerWinsCondition(props) {
        useEffect(() => {
            let interval;
            if (props.running) {
              interval = setInterval(() => {
                props.setTimer((prevTime) => prevTime + 10);
              }, 10);
            } else if (!props.running) {
              clearInterval(interval);
            }
            return () => clearInterval(interval);
          }, [props.running]);

    return (
        props.computerWon && <h1 className="computer-wins-text">Computer Wins</h1> ||
        <div className="timer">
        
        {props.tenzies && !props.running ? <h1>You Win!</h1> : 
        <div className="numbers">
        <span>{("0" + Math.floor((props.timer / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((props.timer / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((props.timer / 10) % 100)).slice(-2)}</span>
      </div>}
    </div>
    )
}