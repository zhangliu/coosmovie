import React from 'react'

import './footer.scss'

export default class className extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='footer'>
        <div className='footerContent'>
          <span>developed by zhangliu, email: </span>
          <a href='mailto:zhangliuge@yeah.net'>zhangliuge@yeah.net</a>
        </div>
      </div>
    )
  }
}
