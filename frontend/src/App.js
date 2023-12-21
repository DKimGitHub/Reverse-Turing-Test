import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [gameId, setGameId] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5000/api/games', { method: 'POST' })
      .then(res => res.json())
      .then(json => setGameId(json.id));
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {gameId ? `Game ID: ${gameId}` : 'Loading...'}
        </a>
      </header>
    </div>
  );
}

export default App;
