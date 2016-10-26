import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import IndexContainer from '../containers/IndexContainer'
import MovieListContainer from '../containers/MovieListContainer'
import PlayerContainer from '../containers/PlayerContainer'
import LoginContainer from '../containers/LoginContainer'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={IndexContainer}>
      <IndexRoute component={MovieListContainer}/>
      <Route path='movie-slice/:id' component={PlayerContainer}/>
      <Route path='login' component={LoginContainer}/>
    </Route>
  </Router>
)
