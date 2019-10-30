import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router';
import { createBrowserHistory } from "history";



import Landing from './Landing.jsx';


const browserHistory = createBrowserHistory();

const App = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  </Router>
);

export default withRouter(App);
