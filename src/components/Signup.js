import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name:"", email:"", password:"",cpassword:""});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password!==credentials.cpassword)
    {
      props.showAlert("Invalid password", "danger");
      navigate('/signup');
    }
    else
    {
      const {name, email, password} = credentials;
    setIsLoading(true);
    // const response = await fetch("https://notesgrabbert1.onrender.com/api/auth/createuser", {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    setIsLoading(false);
    console.log(json);
    if(json.success)
    {
        //Save the authtoken and redirect
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Account created successfully", "success");
    }
    else props.showAlert("Invalid credentials", "danger");
  }
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
    <div className="container mt-5" style={{width:"40%", height:"114%", boxShadow:"0px 3px 8px 0px grey", borderRadius:'10px', padding:"20px"}}>
    <h3>Create your Account</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={credentials.passwprd} name='name' id="name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} required minLength={5} name='password' id="password" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.cpassword} required minLength={5} name='cpassword' id="cpassword" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
    </div>
  )
}

export default Signup;