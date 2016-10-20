
const getStartIntersection = (str1, str2) => {
  if ((str1.length * str2.length) <= 0) {
    return ''
  }
  let start = 0
  let length = str2.length
  let result = ''
  while (start <= str2.length) {
    while (length > start) {
      const subStr = str2.substr(start, length)
      if (str1.indexOf(subStr) === 0) {
        result = result.length > subStr.length ? result : subStr
      }
      length--
    }

    length = str2.length
    start++
  }
  return result
}

const getCompleteStr = (str1, str2) => {
  if ((str2.length * str1.length) === 0) {
    return ''
  }
  const reg = /[^a-zA-Z0-9]/g
  const lowerStr1 = str1.toLowerCase()
  const lowerStr2 = str2.toLowerCase()
  const clearStr1 = lowerStr1.replace(reg, '')
  const clearStr2 = lowerStr2.replace(reg, '')
  if ((clearStr1.length * clearStr2.length) === 0) {
    return ''
  }
  const startChar = clearStr1[0]
  const endChar = clearStr2[clearStr2.length - 1]
  let endIndex = lowerStr1.length
  while ((endIndex = lowerStr1.lastIndexOf(endChar, endIndex - 1)) !== -1) {
    if (endIndex === -1) {
      return ''
    }
    const matchStr1 = lowerStr1.substr(0, endIndex + 1).replace(reg, '')
    let startIndex = -1
    while ((startIndex = lowerStr2.indexOf(startChar, startIndex + 1)) !== -1) {
      const matchStr2 = lowerStr2.substr(startIndex).replace(reg, '')
      if (matchStr1 === matchStr2) {
        return str1.substr(0, endIndex + 1)
      }
    }
  }
  return ''
}

const getMoreStr = (sentence, content) => {
  if (sentence.length <= content.length) {
    return
  }
  let index = content.length
  let hasChar = false
  for (; index < sentence.length; index++) {
    if (/[a-zA-Z0-9]/.test(sentence[index])) {
      hasChar = true
    }
    if (hasChar && /\s/.test(sentence[index])) {
      return sentence.substr(0, index)
    }
  }

  return sentence
}

export default {
  getStartIntersection,
  getCompleteStr,
  getMoreStr,
}
