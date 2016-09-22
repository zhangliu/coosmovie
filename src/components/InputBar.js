import React from 'react'
import {Row, Col, Input, Button} from 'antd'

import './inputBar.scss'

export default class className extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className='input-bar-container'>
        <Col className='input-bar-col-input' span={21}>
          <Input className='input' type="textarea" autosize={{ minRows: 2, maxRows: 2 }}/>
        </Col>
        <Col className='input-bar-col-button' span={3}>
          <Button className='button' type="primary">Primary</Button>
        </Col>
      </Row>
    )
  }
}
