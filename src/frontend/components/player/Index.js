import React from 'react'
import {Row, Col} from 'antd'
import Bar from './Bar'
import Mask from './Mask'
import Detail from './Detail'
import IflyBar from './IflyBar'
import iflyHepler from '../../libs/iflyHepler'
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
        sentence: '',
        translate: '',
      },
      totalSeconds: 0,
      currentSeconds: 0,

      iflyInfo: {
        volume: 10,
        result: '',
        status: 'none',
        disabled: true,
      },
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
                  recognizeSentence={this.state.iflyInfo.result}
                  onRecognizeOk={this.onRecognizeOk.bind(this)}
                  sentence={this.state.mask.sentence}
                  height={this.state.mask.height}/>
              </Col>
              <Col span={5}>
                <Detail
                  currentSlice={this.props.movieSlice}
                  movieSlices={this.props.movieSlices}/>
              </Col>
            </Row>
          </Col>
          <Col span={22} offset={1}>
            <IflyBar
              onTalking={this.onTalking.bind(this)}
              iflyInfo={this.state.iflyInfo}/>
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
        this.state.mask.sentence = segments[index].sentence
        this.state.iflyInfo.disabled = true
        this.state.currentSeconds = this.player.currentTime
        this.setState(this.state)
      }, 100)
    }
  }

  onPause() {
    clearInterval(this.timer)
    this.state.iflyInfo.disabled = false
    this.setState({iflyInfo: this.state.iflyInfo})
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

  onTalking() {
    const session = iflyHepler.getSession({
      onResult: (err, result) => {
        if (+err) {
          return this.setIflyState('result', `error code: ${err}, error description: ${result}`)
        }
        this.setIflyState('result', result ? result+' bulls' : '无法识别！')
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
    this.setState(this.state)
  }

  onRecognizeOk() {
    this.state.segmentInfo.index++
    this.state.iflyInfo.result = ''
    this.setState(this.state, () => {
      this.player.play()
    })
  }
}
