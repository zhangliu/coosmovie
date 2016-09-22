import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import IndexContainer from '../containers/IndexContainer'
import MovieListContainer from '../containers/MovieListContainer'
import MovieContainer from '../containers/MovieContainer'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={IndexContainer}>
      <IndexRoute component={MovieListContainer}/>
      <Route path='movie/:id' component={MovieContainer}/>
    </Route>
  </Router>
)
