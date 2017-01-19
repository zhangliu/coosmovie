import React from 'react'
import {Button, Alert, Tag, Icon} from 'antd'

export default class className extends React.Component {
  constructor(props) {
    super(props)
  }

  renderBar() {
    let tip = '点击开始录音'
    switch (this.props.iflyInfo.status) {
      case 'onStart':
        tip = '服务初始化...';
        break;
      case 'normalVolume':
      case 'started':
        tip = `倾听中${Array(this.props.iflyInfo.volume).fill('.').join('')}`;
        break;
      case 'onStop':
        tip = '等待结果...';
        break;
      case 'lowVolume':
        tip = '倾听中...(声音过小)';
        break;
      case 'onEnd':
      default:
        break
    }
    return (
      <div className='controll-bar'>
        <Button
          className='talk-button'
          onClick={this.props.onTalking}
          size='large'
          type='primary'>{tip}</Button>
        <div className='controll-div'>
          <Button.Group size='small'>
            <Button onClick={this.props.onChangeSentence.bind(null, 0)}>
              重播<Icon type="retweet" />
            </Button>
            <Button onClick={this.props.onChangeSentence.bind(null, -1)}>
              <Icon type="left" />上一句
            </Button>
            <Button onClick={this.props.onChangeSentence.bind(null, 1)}>
              下一句<Icon type="right" />
            </Button>
          </Button.Group>
        </div>
      </div>
    )
  }

  renderSentence() {
    const words = this.props.iflyInfo.result.replace(/\s+/g, ' ').split(' ')
    const result =  words.filter(w => !!w).map((w, i) => <Tag key={i}>{w}</Tag>)
    if (result.length <= 0) {
      return <span className='tip'>请点击下方按钮后进行跟读，识别后的单词将会显示在该区域！</span>
    }
    return result
  }

  render() {
    return (
      <div className='iflyBar'>
        <div className='sentence'>
          {this.renderSentence()}
        </div>
        {this.renderBar()}
      </div>
    )
  }
}
