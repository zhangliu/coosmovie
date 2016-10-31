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
            this.props.movieSlices.map(slice => {
              return <a
                className='slice'
                href={`${config.apiUrl}/movie-slice/${slice.id}`}>{slice.order_id}</a>
            })
          }
        </div>
        <div>请为改视频打个分吧：</div>
        <br/>
        <Rate allowHalf defaultValue={3.5} />
      </div>
    )
  }
}
