import Confetti from "react-confetti";

export default () => {
    const width = window.innerWidth
    const height = window.innerHeight
    return (
      <Confetti
        width={width}
        height={height}
      />
    )
  }