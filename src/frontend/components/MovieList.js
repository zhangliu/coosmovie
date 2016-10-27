import React from 'react'
import {Row, Col} from 'antd'

import './movieList.scss'

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className='movie-list-container'>
        <Col span={22} offset={1}>
          <div className='movie-list-div'>
            {this.props.children}
          </div>
        </Col>
      </Row>
    )
  }
}
