import {connect} from 'react-redux'
import AddTodo from '../components/AddTodo'

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (text, id) => {
      dispatch({type: 'ADD_TODO', text: text, id: id})
    },
  }
}

export default connect(null, mapDispatchToProps)(AddTodo)
