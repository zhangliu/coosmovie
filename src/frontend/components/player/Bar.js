import React from 'react'
import {Progress} from 'antd'
import positionHelper from '../../libs/positionHelper'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const totalMinutes = this.getMinuteFormat(this.props.totalSeconds)
    const currentMinutes = this.getMinuteFormat(this.props.currentSeconds)
    const percent = this.props.currentSeconds / this.props.totalSeconds * 100
    return (
      <div className='bar'>
        <div
          onClick={this.onClick.bind(this)}
          ref={node => this.bar = node}
          className='bar-left'>
          <Progress
            percent={percent}
            format={() => ''}
            status='success'
            strokeWidth={1} />
        </div>
        <div className='bar-right'>{currentMinutes} / {totalMinutes}</div>
      </div>
    )
  }
  getMinuteFormat(totalSeconds) {
    const minutes = `000${Math.floor(totalSeconds / 60)}`.substr(-3)
    const seconds = `00${Math.floor(totalSeconds % 60)}`.substr(-2)
    return `${minutes}:${seconds}`
  }
  onClick(e) {
    const width = this.bar.offsetWidth
    const position = positionHelper.getRelativePosition(e)
    const currentSeconds = Math.floor(this.props.totalSeconds * (position.left / width))
    this.props.onUpdateProgress(currentSeconds)
  }
}
