const getTranslate = async word => {
  const res = await fetch(`http://www.beikaodi.com/api/word/spell/${word}`)
  return (await res.json()).data
}

export default {
  getTranslate,
}
