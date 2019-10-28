import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from "history";



import Hello from './Hello.jsx';
import Landing from './Landing.jsx';


const browserHistory = createBrowserHistory();

const App = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/hello" component={Hello} />
    </Switch>
  </Router>
);

export default App;
