import {connect} from 'react-redux'
import TodoList from '../components/TodoList'

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodoList(state.todos, state.filter),
  }
}

const getVisibleTodoList = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    default: return todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch({type: 'TOGGLE_TODO', id: id})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
