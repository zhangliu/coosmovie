import React from 'react'

export default React.createClass({
  render() {
    const {currentFilter, filter, children, onFilterClick} = this.props
    if (currentFilter === filter) {
      return <span style={{margin: '10px'}}>{children}</span>
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        onFilterClick()
      }} style={{margin: '10px'}}>
        {children}
      </a>
    )
  },
})
