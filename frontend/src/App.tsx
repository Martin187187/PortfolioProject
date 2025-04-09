import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<any>(null);  // State to store the JSON response

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
        .then((res) => res.json())
        .then((data) => setData(data));  // Store the fetched data in the state
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
