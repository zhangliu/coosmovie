import React from 'react'

import './movieBox.scss'

export default class MovieBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: props.data,
    }
  }

  render() {
    return (
      <a
        className={`movie-box-${this.state.movie.type}`}
        href={`movie-slice/${this.state.movie.sliceIds[0]}`}>
        <img src={this.state.movie.img_src}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}/>
        <span>{this.state.movie.name}</span>
      </a>
    )
  }

  onMouseOver(e) {
    console.log('')
  }

  onMouseOut() {
    console.log('')
  }
}
