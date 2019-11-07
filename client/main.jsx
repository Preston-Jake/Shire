import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'
import { BrowserRouter } from 'react-router-dom';
import { ReusableProvider } from "reusable";

Meteor.startup(() => {
  render(<ReusableProvider><BrowserRouter><App /></BrowserRouter></ReusableProvider>, document.getElementById('react-target'));
});
