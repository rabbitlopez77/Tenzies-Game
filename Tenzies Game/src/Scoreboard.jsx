import React from "react";

export default function Scoreboard(props) {
    return (
        <div className="scoreboard">
            <h1 className="player-score">Player Score</h1>
            <h1 className="computer-score">Computer Score</h1>
            <p className="player-win-score">{props.timesWon.player}</p>
            <p className="computer-win-score">{props.timesWon.computer}</p>
        </div>
    )
}