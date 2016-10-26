import React from 'react'
import {message} from 'antd'
import config from '../config'
import rest from '../libs/restHelper'

import Player from '../components/player/Index'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSlice: null,
      playInfo: null,
    }
  }

  async componentWillMount() {
    const movieSlice = await rest.get(`${config.apiUrl}/movie-slice/get?id=${this.props.params.id}`)
    const playInfo = await rest.get(`${config.apiUrl}/play-info/get?movieSliceId=${this.props.params.id}`)
    this.state.movieSlice = movieSlice
    this.state.playInfo = playInfo
    this.setState(this.state)
  }

  render() {
    return (
      <Player
        movieSlice={this.state.movieSlice}
        playInfo={this.state.playInfo}
        segmentIndexChange={this.segmentIndexChange.bind(this)}/>
    )
  }

  async segmentIndexChange(index) {
    if (!this.state.movieSlice) {
      return
    }
    const data = {movieSliceId: this.state.movieSlice.id, segmentIndex: index}
    const result = await rest.put(`${config.apiUrl}/play-info/upsert`, data)
    if (result !== true) {
      message.error('更新最新的segment index失败！')
    }
  }
}
