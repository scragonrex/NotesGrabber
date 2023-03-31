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
    // <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{boxShadow:"0px 3px 10px 0px"}}>
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" to="/">NotesGrabber</Link>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse d-flex align-items-flexen" id="navbarSupportedContent">
    //       {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
    //         </li>

    //       </ul> */}
    //       {!localStorage.getItem('token') ? <form className="d-flex">
    //         <Link className="btn btn-primary mx-1" role="button" to="/login">Login</Link>
    //         <Link className="btn btn-primary mx-1" role="button" to="/signup">Signup</Link>
    //       </form> : <button onClick={handleLogout} className="btn btn-primary ">Logout</button>}
    //     </div>
    //   </div>
    // </nav>
    <nav class="navbar bg-body-tertiary navbar-dark bg-primary">
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