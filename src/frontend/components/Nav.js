import React from 'react'
import {Row, Col, Menu, Icon, Button, Input, Form} from 'antd'

import './nav.scss'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: props.menu,
    }
  }

  render() {
    return (
      <Row className='nav-container'>
        <Col span={2} offset={1}>
          <a href='/' className='nav-logo'>Coosmovie!</a>
        </Col>
        <Col span={8}>
          <Menu
            mode="horizontal"
            theme='dark'
            defaultSelectedKeys={[this.state.menu]}>
            <Menu.Item key="home">
              <a href='/'>首页</a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={12}>
          <span className='nav-user'>{this.renderUserInfo(this.props.user)}</span>
        </Col>
      </Row>
    )
  }

  renderUserInfo(user) {
    if (user) {
      return <span>欢迎：{user.phone}</span>
    }
    return <a href='/login'>登录</a>
  }

  renderAddMovie() {
    return (
      <Button
        style={{display: 'none'}}
        className='nav-add'
        type="primary"
        icon="plus-circle">
        添加我的影片
      </Button>
    )
  }
}
