import React from 'react'
import {Input, Button, Tag} from 'antd'
import ZlPopover from '../../libs/zlPopover/Index'
import positionHelper from '../../libs/positionHelper'
import translateHelper from '../../libs/translateHelper'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popover: {
        content: '',
        title: '',
      },
    }
  }

  render() {
    return (
      <div className='input-bar'>
        <div>
          <Tag>/r: 重播</Tag>
          <Tag>//: 提示下一个单词</Tag>
          <Tag>/s: 查询单词信息</Tag>
        </div>
        <div className='input-bar-down'>
          <div className='input-bar-left'>
            <Input
              ref={node => this.input = node}
              className='input'
              type="textarea"
              onChange={this.onChange.bind(this)}
              autosize={{ minRows: 2, maxRows: 2 }}/>
            <ZlPopover
              ref={node => this.popover = node}
              data={this.state.popover}/>
          </div>
          <div className='input-bar-right'>
            <Button className='button' type="primary">提交</Button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.input.refs.input.focus()
  }

  async onChange(e) {
    this.popover.hide()
    const lastTowChar = e.target.value.substr(-2).toLowerCase()
    const obj = {content: e.target.value, command: ''}
    switch (lastTowChar) {
      case '/s':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'search'
        const position = positionHelper.getCursorPosition(e.target)
        const arr = obj.content.replace(/\s*$/g, '').split(' ')
        const title = arr[arr.length - 1]

        try {
          const data = await translateHelper.getTranslate(title)
          console.log(data)
          const phonogram = data['phonogram']['en'] ? data['phonogram']['en']['text'] : title
          this.state.popover.title = `${title} [${phonogram}]`
          const content = data.brief.splice(0, 3).map(m => m.definition).join(';')
          this.state.popover.content = content
          this.setState(this.state)
        } catch (e) {
          this.state.popover.title = '未找到该词条'
          this.state.popover.content = ''
          this.setState(this.state)
        }
        this.popover.show(position)
        break
      case '/r':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'replay'
        break
      // case '/t':
      //   obj.content = e.target.value.substr(0, e.target.value.length - 2)
      //   obj.command = 'toSave'
      //   break
      case '/a':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'pauseGo'
        break
      case '/b':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'back'
        break
      case '/f':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'forward'
        break
      // case '/!':
      //   obj.content = e.target.value.substr(0, e.target.value.length - 2)
      //   obj.command = 'clear'
      //   break
      case '/+':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'fast'
        break
      case '/-':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'slow'
        break
      case '//':
        obj.content = e.target.value.substr(0, e.target.value.length - 2)
        obj.command = 'showSentence'
        break
      default: break
    }
    e.target.value = obj.content
    this.props.onInputBarChange(obj)
  }

  render() {
    return (
      <div className='input-bar'>
        <div>
          <Tag>/r: 重播</Tag>
          <Tag>//: 提示下一个单词</Tag>
          <Tag>/s: 查询单词信息</Tag>
        </div>
        <div className='input-bar-down'>
          <div className='input-bar-left'>
            <Input
              ref={node => this.input = node}
              className='input'
              type="textarea"
              onChange={this.onChange.bind(this)}
              autosize={{ minRows: 2, maxRows: 2 }}/>
            <ZlPopover
              ref={node => this.popover = node}
              data={this.state.popover}/>
          </div>
          <div className='input-bar-right'>
            <Button className='button' type="primary">提交</Button>
          </div>
        </div>
      </div>
    )
  }
}
