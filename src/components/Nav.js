import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/smileys'>Smileys</Link>
      <Link to='/flags'>Flags</Link>
    </nav>
  )
}

export default withRouter(Nav)