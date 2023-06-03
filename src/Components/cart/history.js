import React, { useEffect, useState } from "react"
import NavBar from "../navbar";
import './cart.css';
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
const History=()=>
{   const navigate=useNavigate();
     const [records,setRecords]=useState([]);
    const fetchData=async()=>{
    const token= Cookie.get("token");
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
            console.log(jsonData)
            jsonData.map((item)=>{
              item.heure=moment(item.date_cmd).format("HH:mm");
              item.date_cmd=moment(item.date_cmd).format("YYYY-MM-DD");
            
          
          })
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
        const token= Cookie.get("token");
        if(!token || token.length===0)
          navigate("/login")
        fetchData();
      },[]);
      return(
        <>
        <NavBar />
        <article>
    {records.map((item) => (
      <div className="cart_box" key={item.id}>
        <div className="cart_img">
          <p>Date commande : {item.date_cmd} à {item.heure}</p>
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