import React from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  const user = null;

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
            <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
