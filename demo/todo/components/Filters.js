import React from 'react'
import Filter from './Filter'

export default React.createClass({

  render() {
    const filterArr = {
      'SHOW_ALL': 'ALL',
      'SHOW_ACTIVE': 'Active',
      'SHOW_COMPLETED': 'Completed',
    }
    return (
      <p>
      {
        Object.keys(filterArr).map(key =>
          {
            return (
              <Filter
              key={key}
              currentFilter={this.props.filter}
              onFilterClick={() => this.props.onFilterClick(key)}
              filter={key}>
              {key}
              </Filter>
            )
          })
        }
        </p>
      )
  }

})
