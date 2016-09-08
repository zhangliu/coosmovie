import React from 'react'
import ReactDom from 'react-dom'
import {combineReducers, createStore} from 'redux'
import {Provider, connect} from 'react-redux'

let User = React.createClass({
	render: function() {
    let nameInput = null;
    let ageInput = null;
		return (
      <div>
        <input ref={node => nameInput=node} onChange={() => this.props.onChangeName(nameInput.value)} value={this.props.name} />;
        <input ref={node => ageInput=node} onChange={() => this.props.onChangeAge(ageInput.value)} value={this.props.age} />;
      </div>
    )
	}
});

// 创建store
/*
{
  name: 'zhangsan',
  age: 20
}
*/
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

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeName: (name) => {
      dispatch({type: 'SET_NAME', name: name})
      console.log(store.getState())
    },

    onChangeAge: (age) => {
      dispatch({type: 'SET_AGE', age: age})
      console.log(store.getState())
    }
  }
}

User = connect(mapStateToProps, mapDispatchToProps)(User)

const App = () => <Provider store={store}><User/></Provider>

ReactDom.render(<App />, document.getElementById('container'));
