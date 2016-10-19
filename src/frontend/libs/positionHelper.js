/* global document */
const getRelativePosition = e => {
  let obj = e.currentTarget;
  const position = {
    top: obj.offsetTop,
    left: obj.offsetLeft,
  }

  while (obj = obj.offsetParent) {
    position.top += obj.offsetTop
    position.left += obj.offsetLeft
  }
  obj = e.currentTarget
  while (obj = obj.parentNode) {
    position.top -= obj.scrollTop ? obj.scrollTop : 0
    position.left -= obj.scrollLeft ? obj.scrollLeft : 0
  }

  position.top = e.clientY - position.top
  position.left = e.clientX - position.left
  return position
}

const getCursorPosition = textarea => {
  const span = document.createElement('span')
  span.style = textarea.style
  span.innerHTML = textarea.value.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>')
  span.position = 'absolute'
  document.body.appendChild(span)

  const position = {
    left: span.offsetWidth + textarea.offsetLeft,
    top: span.offsetHeight + textarea.offsetTop,
  }
  document.body.removeChild(span)
  return position
}

export default {
  getRelativePosition,
  getCursorPosition,
}
