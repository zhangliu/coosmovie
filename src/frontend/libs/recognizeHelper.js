const getRecognizeWords = (originSentence, recognizeSentence) => {
  const recognizeWords = recognizeSentence
                          .toLowerCase()
                          .replace(/\s+/g, ' ')
                          .split(' ')
                          .map(w => w.replace(/\W/g, ''))

  const words = originSentence.replace(/\s+/g, ' ').split(' ')

  return words.filter(w => {
    const world = w.replace(/\W/g, '').toLowerCase()
    return recognizeWords.indexOf(world) !== -1
  })
}

export default {getRecognizeWords}
