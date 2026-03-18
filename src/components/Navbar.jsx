import React from 'react'
import { pages } from '../data/views'
import { Link } from 'react-router-dom'
import "../styles/NavBar.css"
function Navbar() {
  return (
    <>
     <nav className='navbar'>
     <div >
        <ul >
            {pages.map((page)=>(
                <li key={page} className='nav-links' >
                    <Link to={page.path}>{page.name}</Link>
                </li>
            ))}
        </ul>
     </div>
     </nav>
    </>
  )
}

export default Navbar