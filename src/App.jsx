import { useState } from 'react';
import GameBoard from './compnents/GameBoard';
import Player from './compnents/Player';
import Log from './compnents/Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let activePlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') activePlayer = 'O';
  return activePlayer;
}

function getCel(gameBoard, cel) {
  const boardCel = gameBoard[cel.row][cel.column];
  return boardCel;
}

function getWinner(board) {
  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    const a = getCel(board, comb[0]);
    const b = getCel(board, comb[1]);
    const c = getCel(board, comb[2]);
    if (a && a === b && b === c) {
      winner = a;
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }

  const winner = getWinner(gameBoard);

  let activePlayer = deriveActivePlayer(gameTurns);
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') activePlayer = 'O';

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let curPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {winner && <div>WINNER: {winner}</div>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
