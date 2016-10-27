import React from 'react'

import MovieList from '../components/MovieList'
import MovieBox from '../components/MovieBox'

import rest from '../libs/restHelper'
import config from '../config'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  async componentWillMount() {
    this.state.movies = await rest.get(`${config.apiUrl}/movie/get`)
    this.setState(this.state)
  }

  render() {
    return (
      <MovieList>
        {
          this.state.movies.map((movie, index) => {
            return <MovieBox
              key={index}
              onClickMovie={this.onClickMovie.bind(this)}
              data={movie}/>
          })
        }
      </MovieList>
    )
  }

  async onClickMovie(id) {
    const slice = await rest.get(`${config.apiUrl}/movie-slice/getslice?movieId=${id}`)
    window.location.href = `/movie-slice/${slice.id}`
  }
}
