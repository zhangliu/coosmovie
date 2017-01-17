import React from 'react'
import {message} from 'antd'
import config from '../config'
import iflyHepler from '../libs/iflyHepler'
import rest from '../libs/restHelper'

import Player from '../components/player/Index'
import IflyBar from '../components/IflyBar'

const style = {
  css1: {

  },
}

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSlice: {},
      playInfo: {},
      movieSlices: [],
      scoreInfo: 0,
      iflyInfo: {
        volume: 10,
        result: '',
        status: 'none',
      },
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

  async onSegmentIndexChange(index) {
    if (!this.state.movieSlice) {
      return
    }
    const data = {movieSliceId: this.state.movieSlice.id, segmentIndex: index}
    const result = await rest.put(`${config.apiUrl}/play-info/upsert`, data)
    if (result !== true) {
      message.error('更新最新的segment index失败！')
    }
  }

  // async addPlayLog(log) {
  //   await rest.post(`${config.apiUrl}/play-log/add`, log)
  // }
  //
  // async getScoreInfo() {
  //   return await rest.get(`${config.apiUrl}/play-log/get-score-info?movieSliceId=${this.state.movieSlice.id}`)
  // }

  onTalking() {
    const session = iflyHepler.getSession({
      onResult: (err, result) => {
        if (+err) {
          return this.setIflyState('result', `error code: ${err}, error description: ${result}`)
        }
        this.setIflyState('result', result ? result : '无法识别！')
      },
      onVolume: volume => {
        volume = +(volume * 5 / config.iflyInfo.maxVolume).toFixed(0)
        this.setIflyState('volume', volume)
      },
      onProcess: status => { this.setIflyState('status', status) },
      onError: (err) => this.setIflyState('err', err),
    })
    session.start(config.iflyInfo.params);
  }

  setIflyState(key, value) {
    if (this.state.iflyInfo[key] === value) {
      return
    }
    this.state.iflyInfo[key] = value
    this.setState({iflyInfo: this.state.iflyInfo})
  }

  render() {
    return (
      <div style={style.css1}>
        <Player
          movieSlice={this.state.movieSlice}
          movieSlices={this.state.movieSlices}
          playInfo={this.state.playInfo}
          iflyInfo={this.state.iflyInfo}
          onSegmentIndexChange={this.onSegmentIndexChange.bind(this)}/>
        <IflyBar onTalking={this.onTalking.bind(this)} iflyInfo={this.state.iflyInfo}/>
      </div>
    )
  }
}
