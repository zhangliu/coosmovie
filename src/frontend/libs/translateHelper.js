const getTranslate = word => {
  return fetch(`http://www.beikaodi.com/api/word/spell/${word}`)
    .then(res => res.json())
    .then(json => json.data)
}

export default {
  getTranslate,
}
