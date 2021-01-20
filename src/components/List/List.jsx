import React from 'react'
import PropTypes from 'prop-types'

function List(props) {
  return <div>1</div>
}

List.propTypes = {
  mode: PropTypes.oneOf(['vertical', 'horizontal']),
}

export default List
