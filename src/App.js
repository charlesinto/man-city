import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './Resources/css/app.css'
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
