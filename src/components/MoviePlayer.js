import React from 'react'
import {Row, Col, Rate} from 'antd'
import InputBar from './InputBar'

import './moviePlayer.scss'

export default class MoviePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.player = null
  }

  render() {
    return (
      <div className='player-container'>
        <Row>
          <Col span={22} offset={1}>
            <div className='player-div'>
              <video
                id='player'
                ref={node => this.player = node}
                onPlay={this.onPlay.bind(this)}
                onPause={this.onPause.bind(this)}
                onClick={this.onClick.bind(this)}
                src="/test.mov"
                controls="controls"/>
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

  }

  onPause() {
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
