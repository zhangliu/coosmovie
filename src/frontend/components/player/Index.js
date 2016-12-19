import React from 'react'
import {Row, Col} from 'antd'
import Bar from './Bar'
import Mask from './Mask'
import Detail from './Detail'
import IflyBar from './IflyBar'
import sentenceLogic from '../logics/sentence'
import config from '../../config'

import './index.scss'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.player = null
    this.timer = null
    this.state = {
      src: '',
      segmentInfo: {
        index: 0,
        segments: [],
      },
      mask: {
        height: 23,
        fontSize: '14px',
        sentence: '',
        translate: '',
      },
      totalSeconds: 0,
      currentSeconds: 0,
      scoreInfo: {},
    }
  }

  componentWillReceiveProps(props) {
    const segments = JSON.parse(props.movieSlice.segments);
    const index = props.playInfo && props.playInfo.segmentIndex ? props.playInfo.segmentIndex : 0
    this.state.segmentInfo = {segments: segments, index: index}
    this.state.src = config.localUrl
      ? config.localUrl + props.movieSlice.local_src
      : config.qiniuUrl + props.movieSlice.src
    this.setState(this.state, () => {
      const info = this.state.segmentInfo
      this.player.currentTime = info.segments[info.index].startTime / 1000
    })
    this.updateScore()
  }

  render() {
    return (
      <div className='player'>
        <Row>
          <Col span={22} offset={1} className='col1'>
            <Row>
              <Col span={19}>
                <video
                  id='player'
                  ref={node => this.player = node}
                  onPlay={this.onPlay.bind(this)}
                  onPause={this.onPause.bind(this)}
                  onClick={this.onClick.bind(this)}
                  onCanPlay={this.onCanPlay.bind(this)}
                  src={this.state.src}
                  autoPlay={true}/>
                <Bar
                  totalSeconds={this.state.totalSeconds}
                  currentSeconds={this.state.currentSeconds}
                  onUpdateProgress={this.onUpdateProgress.bind(this)}/>
                <Mask
                  sentence={this.state.mask.sentence}
                  height={this.state.mask.height}
                  fontSize={this.state.mask.fontSize}/>
              </Col>
              <Col span={5}>
                <Detail
                  currentSlice={this.props.movieSlice}
                  movieSlices={this.props.movieSlices}
                  scoreInfo={this.state.scoreInfo}/>
              </Col>
            </Row>
          </Col>
          <Col span={22} offset={1}>
            <IflyBar
              handleOnTalking={this.props.handleOnTalking}
              iflyInfo={this.props.iflyInfo}/>
          </Col>
        </Row>
      </div>
    )
  }

  onCanPlay() {
    this.state.totalSeconds = this.player.duration
    this.setState(this.state)
  }

  onPlay() {
    this.player.volume = 1
    clearInterval(this.timer)
    if (this.player) {
      this.timer = setInterval(() => {
        const segments = this.state.segmentInfo.segments
        const index = this.state.segmentInfo.index
        const timeDiff = this.player.currentTime * 1000 - segments[index].endTime
        if (segments[index] && (timeDiff > 0 && timeDiff < 100)) {
          this.player.pause()
        }
        if (segments[index] && (this.player.currentTime * 1000 - segments[index].endTime) > 1000) {
          this.player.currentTime = segments[index].startTime / 1000
        }
        this.state.currentSeconds = this.player.currentTime
        this.setState(this.state)
      }, 100)
    }
    this.props.addPlayLog({
      movie_slice_id: this.props.movieSlice.id,
      type: 'start_play',
      segment_index: this.state.segmentInfo.index,
    })
  }

  async updateScore() {
    const scoreInfo = await this.props.getScoreInfo()
    this.state.scoreInfo = scoreInfo
    this.state.scoreInfo.segmentIndex = this.state.segmentInfo.index
    this.state.scoreInfo.segmentLength = this.state.segmentInfo.segments.length
    this.state.scoreInfo.currentTime = this.player.currentTime
    this.setState(this.state)
  }

  onPause() {
    clearInterval(this.timer)
    this.props.addPlayLog({
      movie_slice_id: this.props.movieSlice.id,
      type: 'stop_play',
      segment_index: this.state.segmentInfo.index,
    })
    this.updateScore()
  }

  onUpdateProgress(currentSeconds) {
    this.state.currentSeconds = currentSeconds
    this.setState(this.state)
    this.player.currentTime = currentSeconds
  }

  onClick() {
    if (!this.player.paused) {
      this.player.pause()
      return
    }
    this.player.play()
  }
}
