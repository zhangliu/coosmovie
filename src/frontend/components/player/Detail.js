import React from 'react'
import {Rate} from 'antd'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div>请为改视频打个分吧：</div>
        <br/>
        <Rate allowHalf defaultValue={3.5} />
      </div>
    )
  }
}
