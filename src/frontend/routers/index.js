import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import IndexContainer from '../containers/IndexContainer'
import MovieListContainer from '../containers/MovieListContainer'
import MovieSliceContainer from '../containers/MovieSliceContainer'
import LoginContainer from '../containers/LoginContainer'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={IndexContainer}>
      <IndexRoute component={MovieListContainer}/>
      <Route path='movie-slice/:id' component={MovieSliceContainer}/>
      <Route path='login' component={LoginContainer}/>
    </Route>
  </Router>
)
