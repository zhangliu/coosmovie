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

export default {
  getRelativePosition,
}
