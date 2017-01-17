import React from 'react'
import positionHelper from '../../libs/positionHelper'

const style = {
  css1: {
    background: '#f1f1f1',
    border: '1px solid #ddd',
    borderTop: '0px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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

  render() {
    const totalMinutes = this.getMinuteFormat(this.props.totalSeconds)
    const currentMinutes = this.getMinuteFormat(this.props.currentSeconds)
    return (
      <div style={style.css1}>
        <div>{currentMinutes} / {totalMinutes}</div>
      </div>
    )
  }
}
