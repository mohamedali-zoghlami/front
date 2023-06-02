import React, { useEffect, useState } from "react"
import NavBar from "../navbar";
import './cart.css';
import { useNavigate } from "react-router-dom";
const History=()=>
{   const navigate=useNavigate();
     const [records,setRecords]=useState([]);
    const fetchData=async()=>{
    const token= localStorage.getItem("token");
    try {
    const response = await fetch('http://localhost:3000/products/history', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'jwt':token
            },
          })
          if(response.ok)
          {const jsonData=await response.json();
            setRecords(jsonData);}
            else
            {
              console.log(response.status)
            }
            }
            catch(e)
                {console.log(e)
                }}
    useEffect(() => {
        const token= localStorage.getItem("token");
        if(!token || token.length===0)
          navigate("/login")
        fetchData();
      });
      return(
        <>
        <NavBar />
        <article>
    {records.map((item) => (
      <div className="cart_box" key={item.id}>
        <div className="cart_img">
          <p>{item.date_cmd}</p>
        </div>
        <div>
          <button>{item.id}</button>
        </div>
        <div>
          <button onClick={() => {navigate(`/history/${item.id}`)}}>Voir details</button>
        </div>
      </div>
    ))}
    </article>
        </>
      )
}
export default History;