import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styles from './App.module.css';
import { Routes } from './Routes';
import { Toolbar } from './Toolbar';

function App() {
  return (
    <Router>
      <main className={styles.App}>
        <Toolbar />
        <Routes />
      </main>
    </Router>
  );
}

export default App;
