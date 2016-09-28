import React from 'react'
import {Progress} from 'antd'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='bar'>
        <div className='bar-left'>
          <Progress
            percent={30}
            format={() => ''}
            status='success'
            strokeWidth={1} />
        </div>
        <div className='bar-right'>005:00 / 192:00</div>
      </div>
    )
  }
}
