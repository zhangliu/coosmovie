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
          <span className='nav-logo'>Emoive !</span>
        </Col>
        <Col span={8}>
          <Menu
            mode="horizontal"
            theme='dark'
            defaultSelectedKeys={[this.state.menu]}>
            <Menu.Item key="home">
              首页
            </Menu.Item>
            <Menu.Item key="smile">
              喜剧
            </Menu.Item>
            <Menu.Item key="meh">
              恐怖
            </Menu.Item>
            <Menu.Item key="love">
              爱情
            </Menu.Item>
            <Menu.Item key="science">
              科幻
            </Menu.Item>
            <Menu.Item key="other">
              其他
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={8} offset={4}>
          <div className='nav-user'>{this.renderUserInfo(this.props.user)}</div>
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
