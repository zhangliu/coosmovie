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
            <Rate allowHalf defaultValue={3.5} />
            <div className='scoreTitle'>您在本视频的得分</div>
          </div>
        </div>
      </div>
    )
  }
}
