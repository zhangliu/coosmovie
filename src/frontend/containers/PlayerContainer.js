import React from 'react'
import {message} from 'antd'
import config from '../config'
import rest from '../libs/restHelper'
import iflyHepler from '../libs/iflyHepler'

import Player from '../components/player/Index'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSlice: {},
      playInfo: {},
      movieSlices: [],
      scoreInfo: 0,
      iflyInfo: {},
    }
  }

  async componentWillMount() {
    const movieSlice = await rest.get(`${config.apiUrl}/movie-slice/get?id=${this.props.params.id}`)
    const movieSlices = await rest.get(`${config.apiUrl}/movie-slice/getallslices?movieId=${movieSlice.movie_id}`)
    const playInfo = await rest.get(`${config.apiUrl}/play-info/get?movieSliceId=${this.props.params.id}`)
    this.state.movieSlice = movieSlice
    this.state.playInfo = playInfo
    this.state.movieSlices = movieSlices
    this.setState(this.state)
  }

  render() {
    return (
      <Player
        movieSlice={this.state.movieSlice}
        movieSlices={this.state.movieSlices}
        playInfo={this.state.playInfo}
        addPlayLog={this.addPlayLog.bind(this)}
        getScoreInfo={this.getScoreInfo.bind(this)}
        handleOnTalking={this.handleOnTalking.bind(this)}
        iflyInfo={this.state.iflyInfo}
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

  async addPlayLog(log) {
    await rest.post(`${config.apiUrl}/play-log/add`, log)
  }

  async getScoreInfo() {
    return await rest.get(`${config.apiUrl}/play-log/get-score-info?movieSliceId=${this.state.movieSlice.id}`)
  }

  async handleOnTalking() {
    const session = iflyHepler.getSession({
      onResult: (err, result) => this.setIflyState('result', {err, result}),
      onVolume: volume => this.setIflyState('volume', volume),
      onProcess: status => { this.setIflyState('status', status) },
      onError: (err) => this.setIflyState('err', err),
    })
    session.start(config.iflyParams);
  }

  setIflyState(key, value) {
    this.state.iflyInfo[key] = value
    this.setState(this.state)
  }
}
