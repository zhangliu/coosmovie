import React from 'react'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recognizedWords: [],
    }
  }

  componentWillReceiveProps(props) {

  }

  renderSentence() {
    return this.props.showSentence
  }

  render() {
    return (
      <div
        className='mask'
        style={{height: this.props.height, marginTop: -this.props.height}}>
        {this.renderSentence()}
      </div>
    )
  }
}
