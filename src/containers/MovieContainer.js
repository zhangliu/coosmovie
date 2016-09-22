import React from 'react'

import MoviePlayer from '../components/MoviePlayer'
import InputBar from '../components/InputBar'

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <MoviePlayer/>
      </div>
    )
  }
}
