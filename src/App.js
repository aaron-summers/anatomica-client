import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './containers/Main';
import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={Main} />
    </div>
  );
}

export default App;
