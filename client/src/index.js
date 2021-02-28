import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'normalize.css'

import IndexPage from './pages/index'
import ErrorPage from './pages/error'
import TemplatePage from './pages/templates'
import SendPage from './pages/send'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={IndexPage} />
        <Route exact path='/templates' component={TemplatePage} />
        <Route exact path='/send' component={SendPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
