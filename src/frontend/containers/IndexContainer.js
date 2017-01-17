import React from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import config from '../config'
import restHelper from '../libs/restHelper'

const style = {
  css1: {
    width: '1000px',
    margin: '0 auto',
  },
}

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  async componentDidMount() {
    this.state.user = await restHelper.get(`${config.apiUrl}/user/get`)
    this.setState(this.state)
  }

  render() {
    return (
      <div>
        <Nav menu='home' user={this.state.user}/>
        <div style={style.css1}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}
