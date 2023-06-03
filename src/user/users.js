import React, { useEffect, useState } from "react"
import NavBar from "../Components/navbar";
import Cookie from "js-cookie";
import {  useNavigate } from "react-router-dom";
import './user.css'
import moment from "moment/moment";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeAll } from "../store/cartSlice";

function Userinfo()
{  
     const dispatch=useDispatch()
     const [item,setRecords]=useState({});
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
            console.log(jsonData);
            jsonData.datejoined=moment(jsonData.datejoined).format("YYYY-MM-DD");
            setRecords(jsonData);
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

      const handledelete= ()=>
      
      {
    
        Swal.fire({
          title: 'Are you sure you want to remove your account?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            const token= Cookie.get("token");
            try {
             
                const response = await fetch(`http://localhost:3000/users/one`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'jwt':token
                },
              })
              console.log(response)
              if(response.ok)
              {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                dispatch(removeAll());
                Cookie.remove("token");
                Cookie.remove("role");
                navigate("/login")
    
              }
                else
                {const error= await response.json()
                  Swal.fire({
                    text:error.message,
                    title:"Erreur !",confirmButtonText: 'OK',icon:"error"
                    });
                }
                }
                catch(e)
                    {Swal.fire({
                      text:e,
                      title:"Erreur !",confirmButtonText: 'OK',icon:"error"
                      });
                    }
          }})}


      return(
        <>
        <NavBar />
        <article>
   
      <div className="user_box" key={item.id}>
        <div >
          <h1>User Info :</h1>
        </div>
        <div>
          
        </div>
        <div>
          <button onClick={() => {navigate(`/user/edit`)}}>Modifier les coordoonées</button>
        </div>
        <div>
          <button onClick={() => {handledelete()}}>Supprimer le compte</button>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1> Username : {item.username}  </h1>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1>Full name : {item.name} {item.lastname} </h1>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1> Address : {item.address}  </h1>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1> Email : {item.email}  </h1>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1> Telephone : {item.tel}  </h1>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1> Gender : {item.gender}  </h1>
        </div>
      </div>
      <div className="user_box" key={item.id}>
        <div >
          <h1> Account created : {item.datejoined}  </h1>
        </div>
      </div>
    </article>
        </>
      )
}
export default Userinfo;