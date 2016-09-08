import {combineReducers, createStore} from 'redux'
import filter from './filter'
import todos from './todos'

const reducer = combineReducers({filter, todos})
const store = createStore(reducer)

export default store
