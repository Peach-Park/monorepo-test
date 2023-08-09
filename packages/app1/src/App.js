import logo from './logo.svg';
import './App.css';
import 'common/css/common.css';
import { Input } from 'common';
import { useState } from 'react';

function App() {

  const [ inputValue, setInputValue ] = useState();
  const inputOnChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Input name="test" className="test" id="inputTest" type="number" value={inputValue} onChange={inputOnChange} ></Input>
        {inputValue}
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
