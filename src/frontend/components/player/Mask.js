import React from 'react'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recognizeSentence: props.recognizeSentence ? props.recognizeSentence : '',
      oldRecognizeWords: [],
    }
  }

  componentWillReceiveProps(props) {
    this.state.recognizeSentence = props.recognizeSentence
    this.setState(this.state)
  }

  renderSentence() {

    const recognizeWords = this.getRecognizeWords(this.state.recognizeSentence)
    const allRecognizeWords = this.state.oldRecognizeWords.concat(recognizeWords)
    const words = this.props.sentence.replace(/\s+/g, ' ').split(' ')

    return words.filter(w => !!w).map((w, i) => {
      const world = w.replace(/\W/g, '').toLowerCase()
      if (allRecognizeWords.indexOf(world) !== -1) {
        if (!this.state.oldRecognizeWords.indexOf(world) !== -1) {
          this.state.oldRecognizeWords.push(world)
        }
        return <a style={{padding: '4px', fontSize: '14px', color: '#87d068'}} key={i}>{w}</a>
      }
      return <a style={{padding: '4px', fontSize: '14px', color: '#fff'}} key={i}>{w}</a>
    })
  }

  getRecognizeWords(sentence) {
    if (!sentence) {
      return []
    }
    return sentence.toLowerCase().replace(/\s+/g, ' ').split(' ').map(w => w.replace(/\W/g, ''))
  }

  render() {
    return (
      <div
        className='mask'
        style={{height: this.props.height}}>
        <div>{this.renderSentence()}</div>
      </div>
    )
  }
}
