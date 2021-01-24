import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import Users from '../users/users'
import Contacts from '../contacts/contacts'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='usuarios' component={Users} />
            <Route path='contatos' component={Contacts} />
            <Route path='compromissos' component={Users} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)