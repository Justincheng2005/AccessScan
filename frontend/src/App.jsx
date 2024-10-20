import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'

import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [resultsLoaded, setResultsLoaded] = useState(false);

  const handleInputChange = (e) => { 
    setInputValue(e.target.value);
  }
  const handleClick = () => {
    console.log(inputValue);
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
        />
        <button className="link-submit" onClick={handleClick}>Check</button>
      </div>
      
      {resultsLoaded ? 
        <div></div>
      :
        <></>}
    </div>
  )
}

export default App
