import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  selectIsAuthenticated,logout, selectActiveUser } from '../store/auth'
import { useHistory } from 'react-router'

const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const activeUser = useSelector(selectActiveUser)
  const history = useHistory()
  const dispatch = useDispatch()

  const handlelogout = () => {
    dispatch(logout())
   
  }
    return (
        <nav >
<ul>

    <li style={{ "float":"right","marginLeft":"10px" }}><Link to="/posts">Posts</Link></li>
  {isAuthenticated ? (
    <>
  <li s><Link to="/add">Add New Post</Link></li>
   <li style={{ "float":"left", "marginBottom":"10px" }}><button className="btn btn-primary" onClick={handlelogout}>Logout</button></li>
   </>
  ): (
    <>
    <li><Link to="/login">Login</Link></li>
  <li><Link to="/register">Register</Link></li>
  
</>
  )}
  <li>
  {isAuthenticated && (
        <li style={{ "float":"left"}}><Link to="/my-posts">My Posts</Link></li>
      )}
      </li>
        <li  style={{ "float":"left", "textAlign":"center","marginLeft":"550px","marginTop":"10px" }}>
    {isAuthenticated ? <h4>Hello {activeUser && activeUser.name}</h4> : <li><h4>Welcome Guest</h4></li>}
  </li>
</ul>
            
        </nav>
    )
}

export default Navbar
