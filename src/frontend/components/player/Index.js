import React from 'react'
import Bar from './Bar'
import ListenMask from './ListenMask'
import WriteMask from './WriteMask'
import RightNav from './RightNav'
import IflyBar from './IflyBar'
import InputBar from './InputBar'
import Video from './Video'
import sentenceLogics from '../logics/sentence'

import './index.scss'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.player = null
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
      isListenMode: false,
    }
  }

  componentWillReceiveProps(props) {
    const stateInfo = {}
    if (this.state.segmentInfo.segments.length <= 0) {
      const segments = JSON.parse(props.movieSlice.segments);
      const index = props.playInfo && props.playInfo.segmentIndex ? props.playInfo.segmentIndex : 0
      stateInfo.segmentInfo = {segments: segments, index: index}
      stateInfo.currentSeconds = segments[index].startTime / 1000
    }

    if (!this.state.src) {
      stateInfo.src = props.movieSlice.src
    }

    if (Object.keys(stateInfo).length > 0) {
      this.setState(stateInfo, () => {
        this.player.setCurrentTime(this.state.currentSeconds)
      })

    }
  }

  onCanPlay() {
    this.setState({totalSeconds: this.player.duration})
  }

  onTimeUpdate() {
    this.setState({currentSeconds: this.player.currentTime}, () => {
      const {segments, index} = this.state.segmentInfo
      if (!segments[index]) {
        return
      }
      const timeDiff = this.state.currentSeconds * 1000 - segments[index].endTime
      if (timeDiff > 0) {
        this.player.pause()
      }
    })
  }

  onPause() {

  }

  onUpdateProgress(currentSeconds) {
    this.setState({currentSeconds})
  }

  onClick() {
    if (!this.player.paused) {
      this.player.pause()
      return
    }
    this.onChangeSentence(0)
  }

  onRecognize(recognizeWords) {
    console.log('onRecognize........');
  }

  onChangeSentence(offset) {
    const segments = this.state.segmentInfo.segments
    let index = this.state.segmentInfo.index + offset
    index = index > 0 ? index : 0
    if (!segments[index]) {
      return
    }
    this.state.segmentInfo.index = index
    this.state.mask.sentence = segments[index].sentence
    this.state.currentSeconds = segments[index].startTime / 1000
    return this.setState(this.state, () => {
      this.player.setCurrentTime(this.state.currentSeconds)
      this.player.play()
    })
  }

  onModeChange(value) {
    this.setState({isListenMode: value})
  }

  onInputBarChange(obj) {
    switch (obj.command) {
      case 'replay':
        this.onChangeSentence(0)
        break
      case 'showSentence':

        break
      default:

    }
    const showSentence = sentenceLogics.getCompleteStr(this.state.mask.sentence, obj.content)
    if (showSentence.length > 0) {
      this.state.mask.showSentence = showSentence
      this.setState({mask: this.state.mask})
    }
  }

  getPractiseBar() {
    if (this.state.isListenMode) {
      return <IflyBar
              onTalking={this.props.onTalking}
              onChangeSentence={this.onChangeSentence.bind(this)}
              iflyInfo={this.props.iflyInfo}/>
    }
    return <InputBar onInputBarChange={this.onInputBarChange.bind(this)}/>
  }

  getMask() {
    if (this.state.isListenMode) {
      return <ListenMask
              recognizeSentence={this.props.iflyInfo.result}
              onRecognize={this.onRecognize.bind(this)}
              sentence={this.state.mask.sentence}
              height={this.state.mask.height}/>
    }
    return <WriteMask
            showSentence={this.state.mask.showSentence}
            height={this.state.mask.height}/>
  }

  render() {
    return (
      <div className='player'>
        <div className='content'>
          <div className='left-div'>
            <Video
              className='video'
              ref={node => this.player = node}
              onTimeUpdate={this.onTimeUpdate.bind(this)}
              onPause={this.onPause.bind(this)}
              onClick={this.onClick.bind(this)}
              onCanPlay={this.onCanPlay.bind(this)}
              src={this.state.src}
              currentTime={this.state.currentSeconds}
              autoPlay={false}/>
            {this.getMask()}
            <Bar
              totalSeconds={this.state.totalSeconds}
              currentSeconds={this.state.currentSeconds}
              onModeChange={this.onModeChange.bind(this)}
              onViedoPlay={this.onClick.bind(this)}
              isListenMode={this.state.isListenMode}
              onUpdateProgress={this.onUpdateProgress.bind(this)}/>
          </div>
          <div className='right-div'>
            <RightNav
              currentSlice={this.props.movieSlice}
              movieSlices={this.props.movieSlices}/>
          </div>
        </div>
        {this.getPractiseBar()}
      </div>
    )
  }
}
