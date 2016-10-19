import React from 'react'

import './movieBox.scss'

export default class MovieBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        <img src={this.props.imgSrc}/>
        <span>{this.props.text}</span>
      </div>
    )
  }
}
