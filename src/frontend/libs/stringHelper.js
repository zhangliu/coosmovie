
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

const getCompleteStr = (str1, str2, ignoreReg) => {
  if (str2.length <= 0) {
    return ''
  }
  const lowerStr1 = str1.toLowerCase()
  const lowerStr2 = str2.toLowerCase()
  if (lowerStr2.length === 1) {
    return str1.charAt(lowerStr1.indexOf(lowerStr2))
  }
  const fChar = str2[0]
  const lChar = str2[str2.length - 1]
  let fromIndex = -1
  while ((fromIndex = lowerStr1.indexOf(fChar, fromIndex + 1)) !== -1) {

    if (fromIndex === -1) {
      return ''
    }
    let fromIndex2 = fromIndex + str2.length - 1 - 1
    while ((fromIndex2 = lowerStr1.indexOf(lChar, fromIndex2 + 1)) !== -1) {
      const subStr = lowerStr1.substring(fromIndex, fromIndex2 + 1)
      if (subStr.replace(ignoreReg, '') === str2) {
        return str1.substring(fromIndex, fromIndex2 + 1)
      }
    }
  }
  return ''
}

export default {
  getStartIntersection,
  getCompleteStr,
}
