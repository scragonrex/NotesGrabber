import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    // const port = "http://localhost:3000";
    const port = "https://notesgrabberbackend.onrender.com";
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://notesgrabberbackend.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json = await response.json();
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
    return (
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login