import React from 'react';
import './App.css';
import ColorConverter from './components/ColorConverter/ColorConverter.jsx';
import Steps from './components/Steps/Steps.jsx';

function App() {
  return (
    <div className='App'>
      <ColorConverter />
      <Steps />
    </div>
  );
}

export default App;
