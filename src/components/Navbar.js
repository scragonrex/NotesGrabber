import React from 'react'
import {
  Link, useNavigate,
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Navbar() {

  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav class="navbar bg-body-tertiary navbar-dark bg-primary" style={{boxShadow:"0px 3px 10px 0px"}}>
      <div class="container-fluid">
      <Link className="navbar-brand" to="/">NotesGrabber</Link>
        {!localStorage.getItem('token') ?
          <Link className="btn mx-1 btn-primary" role="button" to={`${location.pathname==="/signup"? "/login" : "/signup"}`}>{`${location.pathname==="/signup"? "login" : "signup"}`}</Link>
       : <button onClick={handleLogout} className="btn btn-primary ">Logout</button>}
      </div>
    </nav>
  )
}

export default Navbar