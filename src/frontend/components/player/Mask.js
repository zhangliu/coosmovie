import React from 'react'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldRecognizedWords: [],
    }
  }

  componentWillReceiveProps(props) {
    const newRecognizedWords = this.getNewRecognizedWords(this.state.oldRecognizedWords,
      props.recognizeSentence, props.sentence)
    if (newRecognizedWords.length > 0) {
      this.props.onRecognizeOk()
      this.state.recognizeSentence = props.recognizeSentence
      this.state.oldRecognizedWords = this.state.oldRecognizedWords.concat(newRecognizedWords)

      const sentenceWords = this.getSentenceWords(props.sentence)
      if (this.state.oldRecognizedWords.length >= sentenceWords.length) {
        this.props.onRecognizeOk()
      }
      this.setState(this.state)
    }
  }

  getSentenceWords(sentence) {
    if (!sentence) {
      return []
    }
    return sentence.replace(/\s+/g, ' ').split(' ').filter(w => !!w)
  }

  renderSentence() {
    const words = this.getSentenceWords(this.props.sentence)
    return words.map((w, i) => {
      const word = w.replace(/\W/g, '').toLowerCase()
      if (this.state.oldRecognizedWords.indexOf(word) !== -1) {
        return <a style={{padding: '4px', fontSize: '14px', color: '#87d068'}} key={i}>{w}</a>
      }
      return <a style={{padding: '4px', fontSize: '14px', color: '#fff'}} key={i}>{w}</a>
    })
  }

  getNewRecognizedWords(oldRecognizedWords, recognizeSentence, sentence) {
    const recognizeWords = this.getRecognizeWords(recognizeSentence)
    const words = sentence.replace(/\s+/g, ' ').split(' ')
    const result = []
    for (let word of words) {
      word = word.replace(/\W/g, '').toLowerCase()
      if (!word) {
        continue
      }
      if (recognizeWords.indexOf(word) !== -1 && oldRecognizedWords.indexOf(word) === -1) {
        result.push(word)
      }
    }
    return result
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
