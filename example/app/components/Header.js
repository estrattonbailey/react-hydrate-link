import React from 'react'
// import { Link } from 'react-router-dom'
import Link from '../../../package/dist/index.js'

import App from '../App.js'

export default props => (
  <div className="flex">
    <Link to="/" className="ph1" root={App}>Home</Link>
    <Link to="/about" className="ph1" root={App}>About</Link>
  </div>
)
