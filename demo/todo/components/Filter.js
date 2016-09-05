export default ({onClick, currentFilter, filter, children}) => {
  if (currentFilter === filter) {
    return <span>{children}</span>
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault()
      onClick()
    }}>
      {children}
    </a>
  )
}
