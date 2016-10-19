import React from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import config from '../config'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  async componentDidMount() {
    const option = {
      credentials: 'include',
      method: 'get',
    }
    const res = await fetch(`${config.apiUrl}/user/get`, option)
    this.state.user = (await res.json()).data
    this.setState(this.state)
  }

  render() {
    return (
      <div>
        <Nav menu='home' user={this.state.user}/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}
