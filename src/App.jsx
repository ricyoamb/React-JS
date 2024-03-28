  import { useState } from 'react'

  import './App.css'

  function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [nextValue, setNextValue] = useState('X')
    const [winner, setWinner] = useState(null)

    function selectSquare(square) {
      if (winner || squares[square]) return

      const newSquares = [...squares]
      newSquares[square] = calculateNextValue(newSquares)
      setSquares(newSquares)

      const calculatedWinner = calculateWinner(newSquares)
      if (calculatedWinner) {
        setWinner(calculatedWinner)
      } else {
        setNextValue(calculateNextValue(newSquares))
      }
    }

    function restart() {
      setSquares(Array(9).fill(null))
      setNextValue('X')
      setWinner(null)
    }

    function renderSquare(i) {
      return (
        <button className="square m-3 w-12 h-12" onClick={() => selectSquare(i)}>
          {squares[i]}
        </button>
      )
    }

    return (
      <div>
        <div>
          <div>STATUS: {calculateStatus(winner, squares, nextValue)}</div>
          <div className="board-row flex">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row flex">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row flex">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className={winner || squares.every(Boolean) ? 'restart-button' : 'restart-button hidden'}>
            <button onClick={restart}>Restart</button>
          </div>
        </div>
      </div>
    )
  }

  function Game() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    )
  }

  function calculateStatus(winner, squares, nextValue) {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
  }

  function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  function App() {
    return <Game />
  }

  export default App
