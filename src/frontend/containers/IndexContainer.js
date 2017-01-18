import React from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import config from '../config'
import restHelper from '../libs/restHelper'

import './indexContainer.scss'

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
      <div className='indexContainer'>
        <Nav menu='home' user={this.state.user}/>
        <div className='content'>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}
