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
      index: 5,
      segments: [
        {
          time: 5,
          sentence: 'hello world!',
        },
      ],
      mask: {
        height: 50,
        display: false,
      }
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
                onPause={this.onPause.bind(this)}
                onClick={this.onClick.bind(this)}
                src="/test.mov"
                autoPlay={true}/>
              <Bar/>
              <Mask height={this.state.mask.height} display={this.state.mask.display}/>
            </div>
            <div className='player-right'>
              <Detail/>
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
