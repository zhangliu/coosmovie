import React from 'react'
import { Form, Input, Button } from 'antd'
import './login.scss'

const FormItem = Form.Item

export default class className extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='login'>
        <Form horizontal>
          <FormItem label='Account'>
            <Input ref={node => this.phone = node} placeholder="Please input you phone" />
          </FormItem>
          <FormItem label='Password'>
            <Input
              ref={node => this.password = node}
              type="password"
              placeholder='Please input the password' />
          </FormItem>
          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button onClick={this.createAccount.bind(this)}>create account</Button>
            <span className='placeholder'></span>
            <Button onClick={this.login.bind(this)} type='primary'>login</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  createAccount() {
    this.props.onSubmit(this.phone.refs.input.value, this.password.refs.input.value, 'createAccount')
  }

  login() {
    this.props.onSubmit(this.phone.refs.input.value, this.password.refs.input.value, 'login')
  }
}
