import React from 'react'
import {Row, Col, Rate, Progress} from 'antd'
import InputBar from './InputBar'

import './moviePlayer.scss'

export default class MoviePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      index: 5,
      segments: [
        {
          time: 5,
          sentence: 'hello world!',
        },
      ],
      maskHeight: 50,
    }
  }

  render() {
    return (
      <div className='player-container'>
        <Row>
          <Col span={22} offset={1}>
            <div className='player-div'>
              <div className='video-right'>
                <video
                  id='player'
                  ref={node => this.player = node}
                  onPlay={this.onPlay.bind(this)}
                  onPause={this.onPause.bind(this)}
                  onClick={this.onClick.bind(this)}
                  src="/test.mov"
                  height={300}
                  autoPlay={true}
                  controls="controls"/>
                <div
                  className='mask'
                  style={{height: this.state.maskHeight}}>
                  <div className='playBar'>
                    <Progress percent={30} strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className='video-left'>
                <div>请为改视频打个分吧：</div>
                <br/>
                <Rate allowHalf defaultValue={3.5} />
              </div>
            </div>
          </Col>
          <Col span={22} offset={1}>
            <InputBar/>
          </Col>
        </Row>
      </div>
    )
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

  onClick() {
    if (!this.player.paused) {
      this.player.pause()
      return
    }
    this.player.play()
  }
}
