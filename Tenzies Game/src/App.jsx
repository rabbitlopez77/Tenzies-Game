import React, { useEffect } from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "./Confetti"
import Scoreboard from "./Scoreboard"
import ComputerWinsCondition from "./ComputerWinsCondition"


export default function App() {
  const localStorageTimesWon = JSON.parse(localStorage.getItem('Player Score')) != null ? JSON.parse(localStorage.getItem('Player Score')): 0
  const localStorageTimesLost = JSON.parse(localStorage.getItem('Computer Score')) != null ? JSON.parse(localStorage.getItem('Computer Score')): 0
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [computerWon, setComputerWon] = React.useState(false)
  const [timer, setTimer] = React.useState(0)
  const [running, setRunning] = React.useState(false)
  const [hardMode, setHardMode] = React.useState(false)
  const [timeAllowed, setTimeAllowed] = React.useState(20000)
  const [timesWon, setTimesWon] = React.useState({
    player: 0,
    computer: 0
  })

  const localStorageSetTimesWon = localStorage.setItem('Player Score', JSON.stringify(timesWon.player))
  const localStorageSetTimesLost = localStorage.setItem('Computer Score', JSON.stringify(timesWon.computer))

  useEffect(() => {
    const diceAreHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(diceAreHeld && allSameValue){
      setRunning(false)
      setTenzies(true)
      setTimesWon(times => {
        return {...times, player: localStorageTimesWon + 1}
      })
    }
  }, [dice])
  useEffect(() => {
    if(timer === timeAllowed){
      setComputerWon(true)
      setRunning(false)
      setTenzies(true)
      setTimesWon(times => {
        return {...times, computer: localStorageTimesLost + 1}
      })
    }
  }, [timer])
  function gernerateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
      }
  }
    
  function allNewDice() {
    const newDice = []
      for (let i = 0; i < 10; i++) {
            newDice.push(gernerateDie())
        }
        return newDice
    }
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : gernerateDie()
    }))
  }
  function newGameButton() {
    setDice(allNewDice())
    setTenzies(false)
    setTimer(0)
    setComputerWon(false)
    setHardMode(false)
    setTimeAllowed(20000)
    
    
  }

  const diceElements = dice.map(dice => {return <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDie={() => holdDice(dice.id)} />})

  function hardModeButton() {

    return (
      <button onClick={() => setHardMode(true)} className="hard-mode-button">Hard Mode</button>
    )
  }
console.log(hardMode)
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die 
    }))

  }
    return (
      <div>
        <ComputerWinsCondition 
            computerWon={computerWon}
            timer={timer}
            setTimer={setTimer}
            running={running}
            setRunning={setRunning}
            tenzies={tenzies}
         />
        <main>
          {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls. If you don't do it fast enough, the computer wins</p>
            <div className="dice-container">
                {running && diceElements}
            </div>
            {tenzies ? <button className="roll-dice new-game" onClick={newGameButton}>New Game</button> :
            running && <button className="roll-dice" onClick={rollDice}>Roll</button>}
            {tenzies || !running && <button className="buttons" onClick={() => setRunning(true)}>Start</button>}
            {!running && !tenzies? hardModeButton() : ''}
            <Scoreboard timesWon={timesWon} />
            
        </main>
        </div>
    )
}
