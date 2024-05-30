import { useState } from 'react';

export default function Player({ name, symbol, isActive }) {
  const [editing, setEditing] = useState(false);
  const [player, setPlayer] = useState(name);

  function handleClick() {
    setEditing((ed) => !ed);
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className='player'>
        {!editing && <span className='player-name'>{player}</span>}
        {editing && (
          <input
            type='text'
            placeholder='Player Name'
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />
        )}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleClick}>{editing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
