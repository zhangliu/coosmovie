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
    width: '130px',
  },
}

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTalking: false,
      volume: 10,
      sentence: 'the world of investing, can be a jungle. bulls, bears dangers at every turn.',
      status: 'none',
    }
  }

  componentWillReceiveProps(props) {
    if (!props.iflyInfo) {
      return
    }

    if (props.iflyInfo.result) {
      if (props.iflyInfo.result.err) {
        const err = props.iflyInfo.result.err
        const des = props.iflyInfo.result.result
        this.setState({sentence: `error code: ${err}, error description: ${des}`})
      } else {
        this.setState({sentence: props.iflyInfo.result ? props.iflyInfo.result : '无法识别!'})
      }
    }
    this.setState({
      volume: props.iflyInfo.volume,
      status: props.iflyInfo.status ? props.iflyInfo.status : 'none',
    })
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
        if (this.state.volume> 20)
        console.log(this.state.volume);
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
    return <Button style={style.button1} onClick={this.handleOnTalking.bind(this)} size='large' type='primary'>{tip}</Button>
  }

  handleOnTalking() {
    console.log(this.state.status);
    this.props.handleOnTalking()
  }

  renderSentence() {
    const words = this.state.sentence.replace(/\s+/g, ' ').split(' ')
    return words.map((w, i) => <Tag key={i}>{w}</Tag>)
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
