import React, { useEffect, useState } from "react"
import NavBar from "../Components/navbar";
import Cookie from "js-cookie";
import {  useNavigate } from "react-router-dom";
import './user.css'
import moment from "moment/moment";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeAll } from "../store/cartSlice";
import { icon } from "@fortawesome/fontawesome-svg-core";

function UserEdit()
{  
     const dispatch=useDispatch()
     const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [name,setName]=useState('');
  const [address,setAdress]=useState('');
  const [password,setPassword]=useState("");
  const [tel,setTel]=useState('');
            const handlePasswordChange = (event) => {
                setPassword(event.target.value);
            };

        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };

        const handleLastname = (event) => {
            setLastname(event.target.value);
        };
        const handleTelephoneChange = (event) => {
            setTel(event.target.value);
        };
        const handleAdressChange = (event) => {
            setAdress(event.target.value);
        };

        const handleNameChange = (event) => {
            setName(event.target.value);
        };

    const fetchData=async()=>{
    const token= Cookie.get("token");
    try {
    const response = await fetch('http://localhost:3000/users/one', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'jwt':token
            },
          })
          if(response.ok)
          {const jsonData=await response.json();
            setName(jsonData.name);
            setAdress(jsonData.address);
            setTel(jsonData.tel);
            setEmail(jsonData.email);
            setLastname(jsonData.lastname);
            setUsername(jsonData.username);
        }
            else
            {
              console.log(response.status)
            }
            }
            catch(e)
                {console.log(e)
                }}

   const navigate=useNavigate();
    useEffect(() => {
        const token= Cookie.get("token");
        if(!token || token.length===0)
          navigate("/login");
        fetchData();
      },[navigate]);

      const handleUpdate=async ()=>
      
      { const data=
        {
           ...(name.length===0?{}:{"name":name}),
           ...(lastname.length===0?{}:{"lastname":lastname}),
           ...(address.length===0?{}:{"address":address}),
           ...(tel.length===0?{}:{"tel":tel}),
           ...(email.length===0?{}:{"email":email}),
           ...(password.length<6?{}:{"password":password})
           
        }
        console.log(data)
      
        const token=Cookie.get("token");
        try
        {
        const response=await fetch('http://localhost:3000/users',
        {
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
                'jwt':token
              },
              body:JSON.stringify(data)
        });
        if(response.ok)
        {
            Swal.fire(
                {title:"Coordoonées modifiées",
            icon:"success",
            })
            navigate("/")
        }
        else
        {
            Swal.fire(
                {title:response.message ,
            icon:"error",
            })
        }}
        catch(e)
        {
            Swal.fire(
                {title:e,
            icon:"error",
            }) 
        }
        
    
    }


      return(
        <>
        <NavBar />
        <article>
   
      <div className="user_box" >
        <div >
          <h1>Update User : {username} </h1>
        </div>
        </div>
        <form className="sign-form" >
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e)=>handleNameChange(e)}
          required
        />
      </div>
      <div>
        <label>Last name:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e)=>handleLastname(e)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>handleEmailChange(e)}
          required
        />
      </div>
      <div>
        <label>Telephone:</label>
        <input
          type="text"
          value={tel}
          onChange={(e)=>handleTelephoneChange(e)}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e)=>handleAdressChange(e)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>handlePasswordChange(e)}
          required
        />
      </div>
          <button type="submit" onClick={(e)=>handleUpdate()}>Modifier</button>
    </form>
    </article>
        </>
      )
    }
export default UserEdit;