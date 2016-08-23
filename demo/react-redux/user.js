import React from 'react'
import ReactDom from 'react-dom'
import {combineReducers, createStore} from 'redux'
import {Provider, connect} from 'react-redux'

let User = React.createClass({
	render: function() {
		return <div>{this.props.name};{this.props.age}</div>
	}
});

// 创建store
const name = (state='zhangsan', action) => {
  switch(action.type) {
    case 'SET_NAME':
      return action.name;
    default: return state;
  }
}

const age = (state=20, action) => {
  switch(action.type) {
    case 'SET_AGE':
      return action.age;
    default: return state;
  }
}

const reducers = combineReducers({name, age});
const store = createStore(reducers);

// 建立组件和store之间的映射
const mapStateToProps = (state) => {
  return {
    name: state.name,
    age: state.age,
  }
}

User = connect(mapStateToProps)(User)

const App = () => <Provider store={store}><User/></Provider>

ReactDom.render(<App />, document.getElementById('container'));
