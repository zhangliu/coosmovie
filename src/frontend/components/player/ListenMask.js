import React from 'react'

export default class className extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recognizedWords: [],
    }
  }

  componentWillReceiveProps(props) {
    const recognizedWords = this.getRecognizedWords(props.recognizeSentence, props.sentence)
    console.log('recognizedWords', recognizedWords);

    if (recognizedWords.toString() !== this.state.recognizedWords.toString()) {
      this.state.recognizedWords = recognizedWords
      this.props.onRecognize(recognizedWords)
      this.setState({recognizedWords})
    }
  }

  renderSentence() {
    const words = this.getSentenceWords(this.props.sentence)
    return words.map((w, i) => {
      const word = w.replace(/\W/g, '').toLowerCase()
      if (this.state.recognizedWords.indexOf(word) !== -1) {
        return <a style={{padding: '4px', fontSize: '14px', color: '#87d068'}} key={i}>{w}</a>
      }
      return <a style={{padding: '4px', fontSize: '14px', color: '#eee'}} key={i}>{w}</a>
    })
  }

  getSentenceWords(sentence) {
    if (!sentence) {
      return []
    }
    return sentence.replace(/\s+/g, ' ').split(' ').filter(w => !!w)
  }

  getRecognizedWords(recognizeSentence, sentence) {
    const recognizeWords = this.getRecognizeWords(recognizeSentence)
    const words = sentence.replace(/\s+/g, ' ').split(' ')
    const result = []
    for (let word of words) {
      word = word.replace(/\W/g, '').toLowerCase()
      if (!word) {
        continue
      }
      if (recognizeWords.indexOf(word) !== -1) {
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
        style={{height: this.props.height, marginTop: -this.props.height}}>
        {this.renderSentence()}
      </div>
    )
  }
}