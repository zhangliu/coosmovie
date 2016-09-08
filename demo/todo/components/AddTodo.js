import React from 'react'

export default React.createClass({
  render() {
    let input, id = 0
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          this.props.onClick(input.value, id++)
        }}>
          <input ref={node => { input = node }}/>
          <button type='submit'>Add Todo</button>
        </form>
      </div>
    )
  },
})
