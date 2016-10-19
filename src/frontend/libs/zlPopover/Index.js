import React from 'react'
import ReactDom from 'react-dom'
import {Popover, Button} from 'antd'

import './index.scss'

export default class className extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='zlPopover'>
        <Popover content={this.props.data.content} title={this.props.data.title} trigger='click'>
          <span ref={node => this.span = node}></span>
        </Popover>
      </div>
    )
  }

  show(position) {
    const span = ReactDom.findDOMNode(this.span)
    span.style.left = position.left
    span.style.top = position.top
    span.style.display = 'inline-block'
    span.click()
  }

  hide() {
    const span = ReactDom.findDOMNode(this.span)
    if (span.style.display === 'inline-block') {
      span.click()
      span.style.display = 'none'
    }
  }
}
