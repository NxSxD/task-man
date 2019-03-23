import React, { Component } from 'react';
import './App.css';
import { TaskManager } from './task-manager';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskManager />
      </div>
    );
  }
}

export default App;
