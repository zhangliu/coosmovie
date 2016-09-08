import React from 'react'
import Todo from './Todo'

export default React.createClass({
  render() {
    const { todos, onTodoClick } = this.props
    return (
      <ul>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
            />
        )}
      </ul>
    )
  },
})
