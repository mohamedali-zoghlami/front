import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName]=useState('');
  const [adress,setAdress]=useState('');
  const [tel,setTel]=useState('');
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTelChange = (event) => {
    setTel(event.target.value);
  };
  const handleAdressChange = (event) => {
    setAdress(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data=
    {
      "username":username,
      "name":name,
      "lastname":name,
      "email":email,
      "address":adress,
      "tel":tel,
      "role":"User",
      "gender":"Male",
      "password":password,
    }

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        Swal.fire({
          text:"Compte créé avec succès",
          title:"Succes !",confirmButtonText: 'Cool',icon:"success"
          });  
        setUsername('');
        setEmail('');
        setPassword('');
        setAdress('');
        setEmail('');
        setError('');
        setTel('');
        navigate("/login");
      } else {
        Swal.fire({
        text:"Couldn't create user",
        title:"Erreur !",confirmButtonText: 'OK',icon:"error"
        });

      }
    } catch (error) {

      Swal.fire({
      text:error,
      title:"Erreur !",confirmButtonText: 'OK',icon:"error"
      });
    }
    
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <label>Adress:</label>
        <input
          type="text"
          value={adress}
          onChange={handleAdressChange}
          required
        />
      </div>
      <div>
        <label>Telephone:</label>
        <input
          type="text"
          value={tel}
          onChange={handleTelChange}
          required
        />
      </div>
      <p>Vous avez déja un compte? <Link to="/login" className="inscrit">Se connecter !</Link></p>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;