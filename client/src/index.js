import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'normalize.css'

import IndexPage from './pages/index'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route component={IndexPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
