import React from 'react'
import {message} from 'antd'
import config from '../config'
import rest from '../libs/restHelper'

import Player from '../components/player'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: null,
      playInfo: null,
    }
  }

  async componentWillMount() {
    const movie = await rest.get(`${config.apiUrl}/movie/get?id=${this.props.params.id}`)
    const playInfo = await rest.get(`${config.apiUrl}/playinfo/get?movieId=${this.props.params.id}`)
    this.state.movie = movie
    this.state.playInfo = playInfo
    this.setState(this.state)
  }

  render() {
    return (
      <Player
        movie={this.state.movie}
        playInfo={this.state.playInfo}
        segmentIndexChange={this.segmentIndexChange.bind(this)}/>
    )
  }

  async segmentIndexChange(index) {
    if (!this.state.movie) {
      return
    }
    const data = {movieId: this.state.movie.id, segmentIndex: index}
    const result = await rest.put(`${config.apiUrl}/playinfo/upsert`, data)
    if (result !== true) {
      message.error('更新最新的segment index失败！')
    }
  }
}
