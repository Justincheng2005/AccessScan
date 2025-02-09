import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => { 
    setInputValue(e.target.value);
  }
  const scanLink = async(e) => {
    e.preventDefault();

    try{
      setResultsLoaded(false);
      setError("");
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/test', {url: inputValue});
      setResults(res.data);
      setLoading(false);
      setResultsLoaded(true);
    }catch(err) {
      setError('Error occured while scanning the link. Please check the URL and try again');
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="title">Website Accessibility Scanner</h1>
      <div className='input-container'>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a URL"
          className = "link-input"
          aria-label = "linkInput"
        />
        <button className="link-submit" onClick={scanLink}>Check</button>
      </div>

      {error && <div className="error">{error}</div>}
      
      {resultsLoaded ? 
        <div>
          <h2>Results</h2>
          <h3>Pa11y Results</h3>
          {results.pa11yResults.issues.length > 0 ? (
            <ul>
              {results.pa11yResults.issues.map((issue, index) => (
                <li key={index}>
                  <strong>{issue.context}</strong>: {issue.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No accessibility issues found.</p>
          )}

          <h3>Axe Results</h3>
          {results.axeResults.violations.length > 0 ? (
            <ul>
              {results.axeResults.violations.map((violation, index) => (
                <li key={index}>
                  <strong>{violation.description}</strong>: {violation.help}
                </li>
              ))}
            </ul>
          ) : (
            <p>No accessibility violations found.</p>
          )}
        </div>
      :
      loading ? <h3 className="loader">loading...</h3> :
        <></>}
    </div>
  )
}

export default App
