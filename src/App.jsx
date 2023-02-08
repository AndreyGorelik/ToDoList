import React from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Wrapper theme="light"/>
      </BrowserRouter>
  );
}

export default App;
