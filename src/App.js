import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import OnBoard from './components/OnBoard';
import "./css/fonts.css";
import "./css/modal.css";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/onboard" exact component={OnBoard}/>
      </Switch>
    </Router>
  );
}

export default App;
