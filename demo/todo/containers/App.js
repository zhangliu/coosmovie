import React from 'react'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Filters from './Filters'

export default () => {
  return (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Filters />
    </div>
  )
}
