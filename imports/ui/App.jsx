import React, { useState } from 'react';
import { Route, Switch, withRouter, useLocation } from 'react-router';
import { useTransition, animated } from 'react-spring'
import Landing from './Landing.jsx';
import EmissionsForm from './EmissionsForm.jsx';
import Shire from './Shire.jsx';

const App = () => {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  return transitions.map(({ item, props, key }) => (

    <animated.div key={key} style={props} >
      <Switch location={item}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/emissions" component={EmissionsForm} />
        <Route exact path="/shire" component={Shire} />
      </Switch>
    </animated.div >
  ))
}

export default withRouter(App);
