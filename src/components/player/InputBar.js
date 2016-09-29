import React from 'react'
import {Input, Button} from 'antd'

export default class className extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='input-bar'>
        <div className='input-bar-left'>
          <Input
            className='input'
            type="textarea"
            onChange={this.onChange.bind(this)}
            autosize={{ minRows: 2, maxRows: 2 }}/>
        </div>
        <div className='input-bar-right'>
          <Button className='button' type="primary">提交</Button>
        </div>
      </div>
    )
  }

  onChange(e) {
    this.props.onInputBarChange(e.target.value)
  }
}
