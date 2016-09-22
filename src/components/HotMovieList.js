import React from 'react'
import {Row, Col} from 'antd'
import MovieList from './MovieList'
import MovieBox from './MovieBox'

import './hotMovieList.scss'

export default class HotMovieList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MovieList title='热门推荐' titleSrc='#'>
        <MovieBox className='movie-box-big' text='这是一部好电影' imgSrc='/images/movie.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-small' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
        <MovieBox className='movie-box-width-big' text='这是一部好电影' imgSrc='/images/movie2.jpeg'/>
      </MovieList>
    )
  }
}
