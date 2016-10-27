import React from 'react'

import './movieBox.scss'

export default class MovieBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: props.data
    }
  }

  render() {
    return (
      <div className={`movie-box-${this.state.movie.type}`} onClick={this.onClick.bind(this)}>
        <img src={this.state.movie.img_src}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}/>
        <span>{this.state.movie.name}</span>
      </div>
    )
  }

  onClick() {
    this.props.onClickMovie(this.state.movie.id);
  }

  onMouseOver(e) {
    console.log('')
  }

  onMouseOut() {
    console.log('')
  }
}
