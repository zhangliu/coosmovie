import React from 'react'
import {Rate} from 'antd'
import config from '../../config'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='detail'>
        <div className='sliceList'>
          {
            this.props.movieSlices.map((slice, index) => {
              const className = slice.id === this.props.currentSlice.id
                ? 'slice slice-active'
                : 'slice'
              return <a
                key={index}
                className={className}
                href={`/movie-slice/${slice.id}`}>{slice.order_id}</a>
            })
          }
        </div>
        <hr className='separate' />
        <div className='score'>
          <div>
            <div className='scoreTitle'>您在本视频的得分</div>
            <div className='scoreInfo'>{this.getScore(this.props.scoreInfo)}</div>
              <div className='scoreDes'>使用过多'//'或者重复播放视频过多，都会导致分数下降！</div>
          </div>
        </div>
      </div>
    )
  }

  getScore(scoreInfo) {
    if (!scoreInfo || !scoreInfo.segmentLength) {
      return 0
    }
    const num1 = (scoreInfo.segmentIndex / scoreInfo.segmentLength) * 100
    const num2 = scoreInfo.currentTime > 0
      ? ((scoreInfo.playDuration / scoreInfo.currentTime) - 1) * 0.1
      : 0
    const num3 = scoreInfo.helpLogLength * 0.1
    const score = num1 - num2 - num3
    return score > 0 ? score.toFixed(2) : 0
  }
}
