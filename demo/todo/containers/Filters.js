import {connect} from 'react-redux'
import Filters from '../components/Filters'

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterClick: (filter) => {
      dispatch({type: 'SET_FILTER', filter: filter})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
