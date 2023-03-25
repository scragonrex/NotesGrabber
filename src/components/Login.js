import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // const response = await fetch("https://notesgrabbert1.onrender.com/api/auth/login", {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json = await response.json();
        setIsLoading(false);
        console.log(json);
        if(json.success)
        {
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Login successfully", "success");
        }
        else
        props.showAlert("Invalid credentials", "danger");
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    if(isLoading)
    return(
        <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    );


    return (
        <div className="container" style={{width:"100%", height:"70vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div className="container" style={{width:"40%", height:"75%", boxShadow:"0px 3px 8px 0px grey", borderRadius:'10px', padding:"20px"}}>
            <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={handleChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={handleChange}/>
            </div>
            <div className="container" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link className="linkHover" to="/signup" style={{textDecoration:"none",
            }}>Dont's have an account?</Link>
            </div>
        </form>
        </div>
        </div>
    )
}

export default Login