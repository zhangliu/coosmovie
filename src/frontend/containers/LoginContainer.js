import React from 'react'
import {message} from 'antd'

import Login from '../components/Login'
import config from '../config'
import rest from '../libs/restHelper'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Login onSubmit={this.onSubmit.bind(this)} />
    )
  }

  async onSubmit(phone, password, type) {
    const postUrl = type === 'createAccount'
      ? `${config.apiUrl}/user/create`
      : `${config.apiUrl}/user/login`

    const res = await rest.post(postUrl, {phone: phone, password: password})
    if (res === true) {
      message.success('操作成功！')
      if (type === 'login') {
        window.location.href = '/'
      }
      return
    }
    message.error(data)
  }
}
