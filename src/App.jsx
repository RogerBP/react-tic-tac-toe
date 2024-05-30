import { useState } from 'react';
import GameBoard from './compnents/GameBoard';
import Player from './compnents/Player';
import Log from './compnents/Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './compnents/GameOver.jsx';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(turns) {
  let activePlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') activePlayer = 'O';
  return activePlayer;
}

function getCel(gameBoard, cel) {
  const boardCel = gameBoard[cel.row][cel.column];
  return boardCel;
}

function getWinner(board, players) {
  let winnerSymbol = null;
  for (const comb of WINNING_COMBINATIONS) {
    const a = getCel(board, comb[0]);
    const b = getCel(board, comb[1]);
    const c = getCel(board, comb[2]);
    if (a && a === b && b === c) {
      winnerSymbol = a;
    }
  }
  const winner = winnerSymbol ? players[winnerSymbol] : null;
  return winner;
}

function getBameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((a) => [...a])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = getBameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const draw = !winner && gameTurns.length === 9;
  const activePlayer = getActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let curPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers((curPlayers) => {
      const newPlayers = {
        ...curPlayers,
        [symbol]: name,
      };
      return newPlayers;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            onChangeName={handlePlayerNameChange}
            name={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
          />
          <Player
            onChangeName={handlePlayerNameChange}
            name={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
