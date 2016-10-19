import React from 'react'
import {Row, Col} from 'antd'
import Bar from './Bar'
import Mask from './Mask'
import Detail from './Detail'
import InputBar from './InputBar'
import stringHelper from '../../libs/stringHelper'

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
    }
  }

  componentWillReceiveProps(props) {
    const segments = JSON.parse(props.movie.segments);
    const index = props.playInfo ? props.playInfo.segmentIndex - 1 : 0
    this.state.segmentInfo = {segments: segments, index: index}
    this.state.src = props.movie.src
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
            <div className='player-left'>
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
            </div>
            <div className='player-right'>
              <Detail/>
            </div>
          </Col>
          <Col span={22} offset={1}>
            <InputBar
              onInputBarChange={this.onInputBarChange.bind(this)}/>
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
    // this.state.maskHeight = 0
    this.player.volume = 1
    this.setState(this.state)

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
  }

  onPause() {
    clearInterval(this.timer)
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

  onInputBarChange(obj) {
    const index = this.state.segmentInfo.index
    const segment = this.state.segmentInfo.segments[index]

    // 显示写正确的台词
    const reg = /\s|[^a-zA-Z0-9]/g
    const sentence = segment.sentence.toLowerCase().replace(reg, '')
    const content = obj.content.toLowerCase().replace(reg, '')
    const intersectionStr = stringHelper.getStartIntersection(sentence, content)
    const showStr = stringHelper.getCompleteStr(segment.sentence, intersectionStr, reg)
    console.log('showStr==>', showStr)
    const strIndex = segment.sentence.indexOf(showStr)
    console.log(segment.sentence.substr(0, strIndex))
    if (segment.sentence.substr(0, strIndex).replace(reg, '') === '') {
      this.state.mask.sentence = this.state.mask.sentence.length > showStr.length
      ? this.state.mask.sentence
      : showStr
      this.setState(this.state)
    }

    // 如果台词都写对了，就进入下一句
    if (content.replace(reg, '').indexOf(sentence.replace(reg, '')) !== -1) {
      this.state.segmentInfo.index++
      this.state.mask.sentence = ''
      this.setState(this.state)
      this.props.segmentIndexChange(this.state.segmentInfo.index)
      this.player.play()
      return
    }

    switch (obj.command) {
      case 'replay':
        {
          const time = segment.startTime / 1000 - 1
          this.player.currentTime = time
          this.state.currentSeconds = time
          this.setState(this.state)
          this.player.play()
        }
        break
      case 'pauseGo':
        if (this.player.paused) {
          this.player.play()
          break
        }
        this.player.pause()
        break
      case 'back':
        this.player.currentTime = this.player.currentTime - 5
        this.player.play()
        break
      case 'forward':
        this.player.currentTime = this.player.currentTime + 5
        this.player.play()
        break
      case 'slow':
        this.player.playbackRate = this.player.playbackRate - 0.5
        break
      case 'fast':
        this.player.playbackRate = this.player.playbackRate + 0.5
        break
      case 'showSentence':
        if (segment) {
          const showSentences = this.state.mask.sentence.split(/\s+/).filter(e => e.length > 0)
          const sentences = segment.sentence.split(/\s+/).filter(e => e.length > 0)
          this.state.mask.sentence = sentences.slice(0, showSentences.length + 1).join(' ').toLowerCase()
          this.setState(this.state)
        }
        break
      default:
        break
    }
  }
}
