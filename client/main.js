import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

import { Routes, onAuthChange } from '../imports/routes/routes';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration'


Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    Session.set('showVisible', true);
    render(<Routes/>, document.getElementById('render-target'));
});