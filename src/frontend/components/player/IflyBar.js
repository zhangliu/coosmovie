import React from 'react'
import {Button, Alert, Tag} from 'antd'

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
      <div>
        <Button
          className='controllButton'
          onClick={this.props.onTalking}
          size='large'
          type='primary'>{tip}</Button>
        <Button
          className='controllButton'
          onClick={this.props.onNextSentence}
          size='large'>{this.props.canPlayNext ? '下一句' : '重放'}</Button>
      </div>
    )
  }

  renderSentence() {
    const words = this.props.iflyInfo.result.replace(/\s+/g, ' ').split(' ')
    return words.filter(w => !!w).map((w, i) => <Tag key={i}>{w}</Tag>)
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
