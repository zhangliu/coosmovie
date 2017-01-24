import React from 'react'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.paused = !props.autoPlay
  }

  play() {
    this.paused = false
    this.player.play()
  }

  pause() {
    this.paused = true
    this.player.pause()
  }

  onCanPlay() {
    console.log('onCanPlay...');
    this.duration = this.player.duration
    this.props.onCanPlay()
  }

  onTimeUpdate() {
    console.log('onTimeUpdate...');
    this.currentTime = this.player.currentTime
    this.props.onTimeUpdate()
  }

  setCurrentTime(currentTime) {
    console.log('setCurrentTime...', currentTime);
    this.player.currentTime = currentTime
  }

  render() {
    return (
      <div>
        <video
          className={this.props.className}
          ref={node => this.player = node}
          onTimeUpdate={this.onTimeUpdate.bind(this)}
          onPause={this.props.onPause}
          onCanPlay={this.onCanPlay.bind(this)}
          onClick={this.props.onClick}
          src={this.props.src}
          autoPlay={this.props.autoPlay}/>
      </div>
    )
  }
}
