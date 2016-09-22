import React from 'react'

import HotMovieList from '../components/HotMovieList'
import TagMovieList from '../components/TagMovieList'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <HotMovieList />
        <TagMovieList title='喜剧' titleSrc='#' type={1}/>
        <TagMovieList title='悲剧' titleSrc='#' type={1}/>
        <TagMovieList title='灾难' titleSrc='#' type={1}/>
        <TagMovieList title='武打' titleSrc='#' type={1}/>
      </div>
    )
  }
}
