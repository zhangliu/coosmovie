import React from 'react'
import {Row, Col} from 'antd'
import MovieList from './MovieList'
import MovieBox from './MovieBox'

export default class TagMovieList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MovieList title={this.props.title} titleSrc={this.props.titleSrc}>
        <MovieBox className='movie-box-big' text='这是一部好电影' imgSrc='/images/movie.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
      </MovieList>
    )
  }
}
