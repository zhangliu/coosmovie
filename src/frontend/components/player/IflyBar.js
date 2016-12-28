import React from 'react'
import {Button, Alert, Tag} from 'antd'

const style = {
  div1: {
    textAlign: 'center',
    margin: '16px auto',
    background: '#fff',
    padding: '16px 0px',
  },
  div2: {
    textAlign: 'center',
    margin: '16px auto',
    padding: '0px 16px',
  },
  button1: {
    width: '150px',
  },
}

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: props.iflyInfo.volume,
      result: props.iflyInfo.result,
      status: props.iflyInfo.status,
    }
  }

  componentWillReceiveProps(props) {
    this.setState(props.iflyInfo)
  }

  renderBar() {
    let tip = '点击开始录音'
    switch (this.state.status) {
      case 'onStart':
        tip = '服务初始化...';
        break;
      case 'normalVolume':
      case 'started':
        tip = `倾听中${Array(this.state.volume).fill('.').join('')}`;
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
    return <Button
            style={style.button1}
            onClick={this.props.onTalking}
            size='large'
            type='primary'>{tip}</Button>
  }

  renderSentence() {
    const words = this.state.result.replace(/\s+/g, ' ').split(' ')
    return words.filter(w => !!w).map((w, i) => <Tag key={i}>{w}</Tag>)
  }

  render() {
    return (
      <div style={style.div1}>
        <div style={style.div2}>
          {this.renderSentence()}
        </div>
        {this.renderBar()}
      </div>
    )
  }
}
