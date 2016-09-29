import React from 'react'
import {Row, Col} from 'antd'
import Bar from './Bar'
import Mask from './Mask'
import Detail from './Detail'
import InputBar from './InputBar'

import './index.scss'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      segment: {
        index: 0,
        contents: [
          {
            time: 5,
            sentence: 'hello world!',
          },
          {
            time: 15,
            sentence: 'hello world!2',
          },
        ],
      },
      mask: {
        height: 50,
        display: false,
      },
      totalSeconds: 0,
      currentSeconds: 0,
    }
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
                onTimeUpdate={this.onTimeUpdate.bind(this)}
                onPause={this.onPause.bind(this)}
                onClick={this.onClick.bind(this)}
                onCanPlay={this.onCanPlay.bind(this)}
                src="/test.mov"
                autoPlay={true}/>
              <Bar
                totalSeconds={this.state.totalSeconds}
                currentSeconds={this.state.currentSeconds}
                onUpdateProgress={this.onUpdateProgress.bind(this)}/>
              <Mask height={this.state.mask.height} display={this.state.mask.display}/>
            </div>
            <div className='player-right'>
              <Detail/>
            </div>
          </Col>
          <Col span={22} offset={1}>
            <InputBar onInputBarChange={this.onInputBarChange.bind(this)}/>
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
    // this.setState(this.state)
  }

  onPause() {
    // this.state.maskHeight = 100
    // this.setState(this.state)
    console.log(this.player.currentTime)
  }

  onTimeUpdate() {
    const contents = this.state.segment.contents
    const index = this.state.segment.index
    if (contents[index] && contents[index].time === Math.floor(this.player.currentTime)) {
      this.player.pause()
      this.player.currentTime = contents[index].time
    }
    this.state.currentSeconds = this.player.currentTime
    this.setState(this.state)
  }

  onUpdateProgress(currentSeconds) {
    return
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

  onInputBarChange(value) {
    const index = this.state.segment.index
    const segment = this.state.segment.contents[index]
    if (!segment) {
      return
    }
    if (value.replace(/\s/g, '') === segment.sentence.replace(/\s/g, '')) {
      this.state.segment.index++
      this.player.play()
    }
  }
}
