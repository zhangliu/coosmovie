import React from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav menu='home'/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}
