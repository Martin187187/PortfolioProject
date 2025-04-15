import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
const API_BASE = process.env.REACT_APP_API_BASE_URL || "/api";
function App() {
  const [data, setData] = useState<any>(null);  // State to store the JSON response

  useEffect(() => {
    fetch(API_BASE)
        .then((res) => res.json())
        .then((data) => setData(data));
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
          {/* Display the fetched JSON as text */}
          <div>
            <h3>Fetched Data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </header>
      </div>
  );
}

export default App;
