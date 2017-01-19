import React from 'react'
import {Row, Col} from 'antd'

import './movieList.scss'

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='movie-list'>
        <div className='title'>{this.props.title}</div>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
