import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from "../store/userSlice.js"
import Cookies from 'js-cookie';


function Login() {
  const dispatch=useDispatch()
    const [formData, setFormData] = useState(
      {
        username:"",
        password:""
      }
    );
 
    const [error,seterror]=useState("");
    const navigate=useNavigate();
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      };
      
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
          username: formData.username,
          password: formData.password,
        };
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
    
          if (response.ok) {
            const jsonData=await response.json();
            console.log(jsonData);
            localStorage.setItem('token', jsonData.token);
            if(user.username==="admin"||user.username==="doudi1")
              localStorage.setItem('admin',"admin")
            navigate("/");
          } else {
            seterror('Login failed');
          }
        } catch (error) {
          seterror(error);
        }

      };
    
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol >
        <form onSubmit={handleSubmit}>
      <div className='login-form'>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          required
          name="username" 
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          name="password"
        />
      </div>
      <p>Vous êtes pas inscrit? <Link to="/signup" className="inscrit">S'inscrire maintenant !</Link></p>
      <button type="submit">Log in"</button>
      {
        error&&(
          <div className='alert alert-danger' role='alert'>{error}</div>
        )
      }
      </div>
    </form>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

    


      </div>

    </MDBContainer>
  );
}

export default Login;