import React from 'react'
import {Row, Col} from 'antd'
import Bar from './Bar'
import Mask from './Mask'
import RightNav from './RightNav'
import IflyBar from './IflyBar'

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
        sentence: '',
        translate: '',
      },
      totalSeconds: 0,
      currentSeconds: 0,
    }
  }

  componentWillReceiveProps(props) {
    const stateInfo = {}
    if (this.state.segmentInfo.segments.length <= 0) {
      const segments = JSON.parse(props.movieSlice.segments);
      const index = props.playInfo && props.playInfo.segmentIndex ? props.playInfo.segmentIndex : 0
      this.state.segmentInfo = {segments: segments, index: index}
      stateInfo.segmentInfo = this.state.segmentInfo
    }

    if (!this.state.src) {
      this.state.src = props.movieSlice.src
      stateInfo.src = this.state.src
    }

    if (Object.keys(stateInfo).length > 0) {
      this.setState(stateInfo, () => {
        const info = this.state.segmentInfo
        this.player.currentTime = info.segments[info.index].startTime / 1000
      })
    }
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
        this.state.mask.sentence = segments[index].sentence
        this.state.currentSeconds = this.player.currentTime
        this.setState(this.state)
      }, 100)
    }
  }

  onPause() {
    clearInterval(this.timer)
  }

  onUpdateProgress(currentSeconds) {
    this.player.currentTime = currentSeconds
  }

  onClick() {
    if (!this.player.paused) {
      this.player.pause()
      return
    }
    this.player.play()
  }

  onRecognize(recognizeWords) {
    console.log('onRecognize........');
    // this.state.segmentInfo.index++
    // this.setState(this.state)
  }

  onChangeSentence(offset) {
    let index = this.state.segmentInfo.index + offset
    this.state.segmentInfo.index = index > 0 ? index : 0
    return this.setState(this.state, () => {
      this.player.play()
    })
  }

  render() {
    return (
      <div className='player'>
        <div className='content'>
          <div className='left-div'>
            <video
              className='video'
              ref={node => this.player = node}
              onPlay={this.onPlay.bind(this)}
              onPause={this.onPause.bind(this)}
              onClick={this.onClick.bind(this)}
              onCanPlay={this.onCanPlay.bind(this)}
              src={this.state.src}
              autoPlay={false}/>
            <Mask
              recognizeSentence={this.props.iflyInfo.result}
              onRecognize={this.onRecognize.bind(this)}
              sentence={this.state.mask.sentence}
              height={this.state.mask.height}/>
            <Bar
              totalSeconds={this.state.totalSeconds}
              currentSeconds={this.state.currentSeconds}
              onUpdateProgress={this.onUpdateProgress.bind(this)}/>
          </div>
          <div className='right-div'>
            <RightNav
              currentSlice={this.props.movieSlice}
              movieSlices={this.props.movieSlices}/>
          </div>
        </div>
        <IflyBar
          onTalking={this.props.onTalking}
          onChangeSentence={this.onChangeSentence.bind(this)}
          iflyInfo={this.props.iflyInfo}/>
      </div>
    )
  }
}
