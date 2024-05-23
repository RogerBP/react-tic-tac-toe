import GameBoard from './GameBoard';
import Player from './compnents/Player';

function App() {
    return (
        <main>
            <div id='game-container'>
                <ol id='players'>
                    <Player name='Player 1' symbol='X' />
                    <Player name='Player 2' symbol='O' />
                </ol>
                <GameBoard />
            </div>
            LOG
        </main>
    );
}

export default App;
